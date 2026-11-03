---
title: "Letting People Add Problems to My SQL Practice Platform"
description: "How I added admin accounts and user proposals to my SQL practice site, and why accepting SQL from users changed how problems get checked."
pubDate: 2026-11-03
---

When I first [built my SQL practice platform](/blog/sql-practice-platform), every problem lived in the code repository. Adding one meant writing a folder of files, opening a pull request and running a seed script. That worked for the first 18 problems, but it made the set slow to grow, and nobody else could contribute. So I added account roles, a way for users to suggest problems, and an editor for admins.

## What's new

- **Account roles.** An account is now either a regular user or an admin, and more tiers can be added later.
- **Problem proposals.** Any signed-in user can suggest a problem. Only a title, difficulty and description are required, so you can send an idea without writing any SQL. You can follow its status and read the reviewer's note.
- **A review queue.** Admins see every pending proposal, and can either reject it with a note or start a new problem from it.
- **An admin editor.** Admins can write or edit a problem on the site. **Verify** runs it in the sandbox and shows the expected output on every dataset. **Publish** puts it live straight away.

## Keeping admin access safe

The most important rule is that nobody can make themselves an admin. Users can only update their own display name and avatar, and the database enforces that, so the role column is out of reach even if someone calls the database directly. Roles can only be changed with a command-line script that needs the secret key.

The app also reads the role from the database on every request instead of storing it in the login token, so removing someone's admin access takes effect immediately. And the checks live in the code that reads and writes data rather than only on the pages, so a page that forgets its own check still can't leak anything.

## Accepting SQL from users

This was the hard part. Until now, the only SQL I checked ahead of time was my own, so verifying a problem could run on the main thread. PGlite runs synchronously, so on a server, a single query that never finishes would block everything else.

So verification moved into a worker thread that can be killed, the same approach the grader already used for submissions. A proposal's SQL is shown to admins as plain text and only runs when an admin clicks Verify. Remote images are also dropped while reviewing, because an image in a proposal would otherwise load as soon as an admin opened it and reveal their IP address.

## Nothing broken goes live

A problem can't be published unless it passes the checks that used to run only on the files in the repository:

- It has a description, schema, sample data, at least one topic tag, and 2 to 5 hidden test cases.
- The reference solution runs on every dataset and returns rows on the sample data.
- Every known wrong answer, which I call a pitfall, is rejected by at least one hidden test case.

Publishing re-runs these on the server, whatever the editor last showed. Saving happens in a single database transaction, so a failed edit can't leave a live problem with no test cases. Problems also can't be deleted, only unpublished, because deleting one would wipe users' submission history.

## The trade-off: moving problems into the database

The database now owns the problems, which meant changing the seed script. It used to unpublish anything that wasn't in the repository, which would have hidden every problem created on the site. Now it only adds missing problems and never overwrites anything.

That choice has a real cost. Changes to live problems no longer go through pull requests, the automated test suite no longer checks them, and the database is the only copy of any edited problem. I accepted that because adding problems from the site was the whole point, and the publish checks replace most of what the test suite did.

## What I'd improve next

- **Exporting problems back to files**, so there's a backup and a way to review changes in git.
- **Email notifications**, since proposers currently have to check the proposals page to see a decision.
- **Crediting proposers** on the problems they suggested.

The source code is on [GitHub](https://github.com/ArjieeAr/SQL-Practice).
