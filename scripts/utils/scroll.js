/**
 * Smoothly scroll to the element matching the given CSS selector.
 * @param {string} selector - CSS selector of the target element.
 */
const smoothTo = (selector) => {
	document
		.querySelector(selector)
		?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* Scroll-reveal observer */
(() => {
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add("in");
					observer.unobserve(entry.target);
				}
			}
		},
		{ threshold: 0.1 },
	);

	document.querySelectorAll(".reveal, .reveal-l, .reveal-r").forEach((el) => {
		observer.observe(el);
	});
})();
