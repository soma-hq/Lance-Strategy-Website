/**
 * toast.js
 * Simple toast notification system with auto-dismiss and progress bar.
 * @param {string|Object} options
 * @param {string} [options.type='info']     - 'success' | 'info' | 'warning' | 'error'
 * @param {string} [options.title]           - Bold heading line.
 * @param {string} [options.message]         - Secondary description line.
 * @param {number} [options.duration=4000]   - Auto-dismiss delay in milliseconds.
 */
const toast = (options) => {
	const stack = document.getElementById("toastStack");
	if (!stack) return;

	/* Backward-compat: plain string → info toast */
	if (typeof options === "string")
		options = { type: "info", message: options };

	const {
		type = "info",
		title = "",
		message = "",
		duration = 4000,
	} = options;

	/* SVG icons per type */
	const icons = {
		success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/></svg>`,
		info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="8.01"/><line x1="12" y1="11" x2="12" y2="16"/></svg>`,
		warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
		error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
	};

	const iconHtml = icons[type] ?? icons.info;

	/* Build element */
	const el = document.createElement("div");
	el.className = `toast toast-${type}`;
	el.innerHTML = `
		<div class="toast-accent"></div>
		<div class="toast-icon">${iconHtml}</div>
		<div class="toast-body">
			${title ? `<div class="toast-title">${title}</div>` : ""}
			${message ? `<div class="toast-message">${message}</div>` : ""}
		</div>
		<button class="toast-dismiss" aria-label="Fermer">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
				<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
			</svg>
		</button>
		<div class="toast-progress"><div class="toast-progress-bar"></div></div>`;

	stack.appendChild(el);

	/* Animate progress bar */
	const bar = el.querySelector(".toast-progress-bar");
	bar.getBoundingClientRect(); // force reflow
	bar.style.transitionDuration = `${duration}ms`;
	bar.classList.add("toast-progress-run");

	/**
	 * Animate toast out then remove from DOM.
	 * @param {HTMLElement} toastEl
	 */
	const dismiss = (toastEl) => {
		clearTimeout(timer);
		toastEl.classList.add("toast-out");
		setTimeout(() => toastEl.remove(), 320);
	};

	/* Auto-dismiss */
	const timer = setTimeout(() => dismiss(el), duration);

	/* Manual dismiss */
	el.querySelector(".toast-dismiss").addEventListener("click", () =>
		dismiss(el),
	);
};
