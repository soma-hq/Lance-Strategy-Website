/** Fade-out the loader overlay on window load. */
window.addEventListener("load", () => {
	setTimeout(() => {
		document.getElementById("loader")?.classList.add("out");
	}, 1000);
});
