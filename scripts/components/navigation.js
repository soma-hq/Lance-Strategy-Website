/**
 * navigation.js
 * Navbar scroll, hamburger, mobile menu,
 * and custom select dropdowns (Navigation, Réseaux, Langue).
 */

(() => {
	const navbar    = document.getElementById("navbar");
	const ham       = document.getElementById("navHam");
	const mob       = document.getElementById("mobileMenu");
	const navSel    = document.getElementById("navSel");
	const socialSel = document.getElementById("socialSel");
	const langSel   = document.getElementById("langSel");

	/* Scroll state */
	window.addEventListener("scroll", () => {
		navbar.classList.toggle("scrolled", window.scrollY > 30);
	}, { passive: true });

	/**
	 * Close all selects except the given one.
	 * @param {Element} [except]
	 */
	const closeAll = (except) => {
		[navSel, socialSel, langSel].forEach((sel) => {
			if (sel && sel !== except) sel.classList.remove("open");
		});
	};

	/**
	 * Toggle a select panel open/closed.
	 * @param {Element} sel
	 */
	const toggle = (sel) => {
		const opening = !sel.classList.contains("open");
		closeAll();
		if (opening) sel.classList.add("open");
	};

	/* Hamburger toggle */
	ham.addEventListener("click", () => {
		mob.classList.toggle("open");
		closeAll();
	});

	/* Navigation select */
	if (navSel) {
		document.getElementById("navSelTrigger").addEventListener("click", (e) => {
			e.stopPropagation();
			toggle(navSel);
		});
		navSel.querySelectorAll(".nav-sel-item").forEach((item) => {
			item.addEventListener("click", () => closeAll());
		});
	}

	/* Social networks select */
	if (socialSel) {
		document.getElementById("socialSelTrigger").addEventListener("click", (e) => {
			e.stopPropagation();
			toggle(socialSel);
		});
		socialSel.querySelectorAll(".nav-sel-item").forEach((item) => {
			item.addEventListener("click", () => closeAll());
		});
	}

	/* Language select */
	if (langSel) {
		document.getElementById("langSelTrigger").addEventListener("click", (e) => {
			e.stopPropagation();
			toggle(langSel);
		});

		/**
		 * Update trigger label after a language is picked.
		 * @param {string} lang - 'fr' | 'en' | 'es' | 'ja' | 'zh'
		 */
		langSel.addEventListener("click", (e) => {
			const btn = e.target.closest(".lang-btn[data-lang]");
			if (!btn) return;

			const meta = {
				fr: { flag: "🇫🇷", name: "Français" },
				en: { flag: "🇬🇧", name: "English" },
				es: { flag: "🇪🇸", name: "Español" },
				ja: { flag: "🇯🇵", name: "日本語" },
				zh: { flag: "🇨🇳", name: "中文" },
			};
			const lang = btn.dataset.lang;
			const m = meta[lang];
			if (!m) return;

			const flagEl = document.getElementById("navLangFlag");
			const nameEl = document.getElementById("navLangCode");
			if (flagEl) flagEl.textContent = m.flag;
			if (nameEl) nameEl.textContent = m.name;

			langSel.querySelectorAll(".lang-btn").forEach((b) => {
				b.classList.toggle("lang-btn--active", b === btn);
				b.classList.toggle("nav-sel-item--active", b === btn);
			});

			closeAll();
		});
	}

	/* Close all on outside click */
	document.addEventListener("click", (e) => {
		[navSel, socialSel, langSel].forEach((sel) => {
			if (sel && !sel.contains(e.target)) sel.classList.remove("open");
		});
		if (ham && mob && !ham.contains(e.target) && !mob.contains(e.target)) {
			mob.classList.remove("open");
		}
	});
})();

/** Close mobile menu from inline handlers. */
const closeMob = () => {
	document.getElementById("mobileMenu")?.classList.remove("open");
};
