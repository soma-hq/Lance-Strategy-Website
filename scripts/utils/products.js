/**
 * Filter visible products by category.
 * @param {HTMLElement} btn - The tab button that was clicked.
 * @param {string} category - Category key ('all', 'tcg', 'fig', 'scl', 'cus').
 */
const filterProd = (btn, category) => {
	document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
	btn.classList.add("active");

	document.querySelectorAll("#prodGrid > [data-cat]").forEach((card) => {
		const isFeatured = card.classList.contains("pcard-featured");
		const catMatch = category === "all" || card.dataset.cat === category;
		const visible = catMatch && !(isFeatured && category !== "all" && category !== "tcg");

		card.classList.remove("pcard-show");

		if (visible) {
			card.style.display = "";
			void card.offsetWidth; /* trigger reflow for animation restart */
			card.classList.add("pcard-show");
		} else {
			card.style.display = "none";
		}
	});
};
