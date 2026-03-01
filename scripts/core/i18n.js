((global) => {
	const FALLBACK = "fr";
	const STORE_KEY = "ip-lang";
	const BASE_PATH = "locales/";

	let _lang =
		(typeof localStorage !== "undefined"
			? localStorage.getItem(STORE_KEY)
			: null) ?? FALLBACK;
	let _dict = {};
	let _ready = false;

	/**
	 * Fetch a single locale JSON file.
	 * @param {string} lang
	 * @returns {Promise<Object>}
	 */
	const fetchLocale = async (lang) => {
		const res = await fetch(`${BASE_PATH}${lang}.json`);
		if (!res.ok) throw new Error(`i18n: ${lang}.json → HTTP ${res.status}`);
		return res.json();
	};

	/**
	 * Load a locale, falling back to FALLBACK on network / 404 errors.
	 * @param {string} lang
	 * @returns {Promise<void>}
	 */
	const loadLocale = async (lang) => {
		try {
			_dict = await fetchLocale(lang);
			_lang = lang;
		} catch (err) {
			console.warn(err.message, `— falling back to "${FALLBACK}"`);
			if (lang !== FALLBACK) {
				_dict = await fetchLocale(FALLBACK);
				_lang = FALLBACK;
			}
		}
		if (typeof localStorage !== "undefined")
			localStorage.setItem(STORE_KEY, _lang);
	};

	/* Translation lookup */

	/**
	 * Return the translation for a given dot-notation key.
	 * Falls back to the raw key if not found.
	 * @param {string} key
	 * @returns {string}
	 */
	const t = (key) => _dict[key] ?? key;

	/* Language switch */

	/**
	 * Switch to a new language, reload its JSON, re-apply the DOM, and
	 * dispatch a "languagechange" event so other modules can react.
	 * @param {string} lang
	 * @returns {Promise<void>}
	 */
	const setLanguage = async (lang) => {
		await loadLocale(lang);
		applyTranslations();
		document.dispatchEvent(
			new CustomEvent("languagechange", { detail: { lang: _lang } }),
		);
	};

	/** @returns {string} Active language code. */
	const getCurrentLang = () => _lang;

	/* DOM application */

	/** Walk the DOM and update all data-i18n* elements with current translations. */
	const applyTranslations = () => {
		for (const el of document.querySelectorAll("[data-i18n]"))
			el.textContent = t(el.dataset.i18n);

		for (const el of document.querySelectorAll("[data-i18n-html]"))
			el.innerHTML = t(el.dataset.i18nHtml);

		for (const el of document.querySelectorAll("[data-i18n-placeholder]"))
			el.placeholder = t(el.dataset.i18nPlaceholder);

		for (const el of document.querySelectorAll("[data-i18n-title]"))
			el.title = t(el.dataset.i18nTitle);

		for (const el of document.querySelectorAll("[data-i18n-aria]"))
			el.setAttribute("aria-label", t(el.dataset.i18nAria));

		/* Page <title> */
		const metaTitle = t("meta.title");
		if (metaTitle !== "meta.title") document.title = metaTitle;

		/* Lang switcher buttons */
		for (const btn of document.querySelectorAll(".lang-btn[data-lang]"))
			btn.classList.toggle(
				"lang-btn--active",
				btn.dataset.lang === _lang,
			);

		/* html[lang] attribute */
		document.documentElement.lang = _lang;
	};

	/* Event delegation for language buttons */
	const bindLangButtons = () => {
		document.addEventListener("click", (e) => {
			const btn = e.target.closest(".lang-btn[data-lang]");
			if (btn) setLanguage(btn.dataset.lang);
		});
	};

	/* Initialisation */

	const init = async () => {
		await loadLocale(_lang);
		applyTranslations();
		bindLangButtons();
		_ready = true;
		document.dispatchEvent(
			new CustomEvent("i18nready", { detail: { lang: _lang } }),
		);
	};

	/* Expose public API immediately so other scripts can reference i18n.t() */
	global.i18n = {
		t,
		setLanguage,
		getCurrentLang,
		apply: applyTranslations,
		get ready() {
			return _ready;
		},
	};

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
})(window);
