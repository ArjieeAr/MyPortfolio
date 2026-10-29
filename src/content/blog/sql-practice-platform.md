---
title: "Building an SQL Practice Platform"
description: "How I built a LeetCode-style site for practicing SQL, and the hardest part: running untrusted queries safely."
pubDate: 2026-10-29
---

SQL is one of the skills I use most, so I wanted a place to practice it that focused on nothing else. I built an SQL practice platform: a LeetCode-style site where you read a problem, write a query, and check it against the right answer.

## What it does

- **Run** executes your query instantly in the browser on PGlite, which is Postgres compiled to WebAssembly. It compares your output with the expected result for the sample data.
- **Submit** grades your query on the server against hidden test cases full of NULLs, ties, empty tables and boundary dates. It tells you which case failed and why, without revealing the hidden data.
- **Accounts** via email or GitHub. Anyone can browse and run queries, and signing in unlocks submissions, history and a profile with solved counts and a daily streak.
- **Editor and schema viewer.** A Monaco editor with table and column completion, error underlines at the exact position Postgres reports, and a viewer for each problem's tables.

It has 18 original problems across JOINs, GROUP BY, window functions, CTEs, subqueries, NULL handling and dates.

## The hard part: running untrusted SQL

Anyone can type any query, so running it safely was the most interesting problem. A few decisions mattered most:

- **Fresh database per test case.** Each case gets a new PGlite instance, so nothing one query does can leak into the next case or the next user.
- **Let Postgres enforce the rules.** Instead of checking queries with a regex, the query runs inside a read-only cursor. Postgres itself rejects anything that isn't a single `SELECT`, and a row cap stops huge result sets.
- **A separate thread for timeouts.** PGlite runs synchronously, so it blocks the JavaScript event loop. Each server test case runs in a worker thread that gets terminated after 3 seconds.
- **Faster cold starts.** Initializing a database took about 2 seconds, so the server builds one initialized cluster and each case restores from it. That cut the per-case time from about 2.2 seconds to about 0.65 seconds.

## Comparing results fairly

Two correct queries can return rows in different orders or with different column aliases, so the comparison has to be careful. Columns are matched by position, rows are compared as a multiset unless the order matters, and numbers are compared by value rather than by text.

## What I'd improve next

The project has known limits that I'd tackle first at scale. The rate limit can be beaten by two simultaneous requests, and the query runs as a superuser when a dedicated low-privilege role would be safer. Writing these down was useful, because it turned vague worries into a concrete list.

The source code is on [GitHub](https://github.com/ArjieeAr/SQL-Practice).
