// Adds "is-visible" to each [data-reveal] element as it scrolls into view, and removes it once the element
// has fully left the screen, so the animation plays again every time you scroll back to it.
// The fade and slide themselves are CSS (see "Motion" in global.css); this only decides when they start.
const elements = document.querySelectorAll("[data-reveal]");

// Shows elements. Starts a little before they're fully on screen, so the motion is already underway.
const showObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    }
  },
  { rootMargin: "0px 0px -10% 0px" },
);

// Resets elements, but only once they're completely off screen, so nothing fades out while you can see it.
// `data-reveal-above` remembers which edge it left by, so it slides back in from that side next time.
const hideObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) {
      entry.target.classList.remove("is-visible");
      entry.target.toggleAttribute("data-reveal-above", entry.boundingClientRect.top < 0);
    }
  }
});

elements.forEach((element) => {
  showObserver.observe(element);
  hideObserver.observe(element);
});
