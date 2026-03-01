(() => {
	/* Helpers */

	/** @returns {string} Current time in HH:MM format. */
	const now = () => {
		const d = new Date();
		return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
	};

	/**
	 * Escape HTML special characters.
	 * @param {string} str
	 * @returns {string}
	 */
	const esc = (str) =>
		String(str)
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;");

	/**
	 * Build the conversation flow tree from current i18n translations.
	 * @returns {Object} Flow node map keyed by node ID.
	 */
	const buildFlow = () => {
		const t = typeof i18n !== "undefined" ? (k) => i18n.t(k) : (k) => k;
		return {
			start: {
				id: "start",
				bot: [t("flow.start.bot1")],
				choices: [
					{
						label: t("flow.start.choice1"),
						icon: "cards",
						next: "tcg_game",
					},
					{
						label: t("flow.start.choice2"),
						icon: "figurine",
						next: "fig_type",
					},
					{
						label: t("flow.start.choice3"),
						icon: "package",
						next: "sealed_type",
					},
					{
						label: t("flow.start.choice4"),
						icon: "sparkles",
						next: "custom_intro",
					},
					{
						label: t("flow.start.choice5"),
						icon: "info",
						next: "info_general",
					},
				],
			},

			tcg_game: {
				id: "tcg_game",
				bot: [t("flow.tcg_game.bot1"), t("flow.tcg_game.bot2")],
				choices: [
					{
						label: t("flow.tcg_game.choice1"),
						icon: "lightning",
						next: "tcg_pokemon_format",
					},
					{
						label: t("flow.tcg_game.choice2"),
						icon: "dragon",
						next: "tcg_ygo_format",
					},
					{
						label: t("flow.tcg_game.choice3"),
						icon: "wand",
						next: "tcg_magic_format",
					},
					{
						label: t("flow.tcg_game.choice4"),
						icon: "pirate",
						next: "tcg_onepiece",
					},
					{
						label: t("flow.tcg_game.choice5"),
						icon: "cards",
						next: "tcg_other",
					},
				],
			},

			tcg_pokemon_format: {
				id: "tcg_pokemon_format",
				bot: [t("flow.tcg_poke.bot1")],
				choices: [
					{
						label: t("flow.tcg_poke.choice1"),
						icon: "box",
						next: "rec_booster_slim",
					},
					{
						label: t("flow.tcg_poke.choice2"),
						icon: "box",
						next: "rec_etb",
					},
					{
						label: t("flow.tcg_poke.choice3"),
						icon: "package",
						next: "rec_display",
					},
					{
						label: t("flow.tcg_poke.choice4"),
						icon: "cards",
						next: "rec_card_single",
					},
					{
						label: t("flow.tcg_poke.choice5"),
						icon: "gem",
						next: "rec_coffret",
					},
				],
			},

			tcg_ygo_format: {
				id: "tcg_ygo_format",
				bot: [t("flow.tcg_ygo.bot1")],
				choices: [
					{
						label: t("flow.tcg_ygo.choice1"),
						icon: "box",
						next: "rec_booster_slim",
					},
					{
						label: t("flow.tcg_ygo.choice2"),
						icon: "package",
						next: "rec_display",
					},
					{
						label: t("flow.tcg_ygo.choice3"),
						icon: "cards",
						next: "rec_card_single",
					},
				],
			},

			tcg_magic_format: {
				id: "tcg_magic_format",
				bot: [t("flow.tcg_magic.bot1")],
				choices: [
					{
						label: t("flow.tcg_magic.choice1"),
						icon: "box",
						next: "rec_booster_slim",
					},
					{
						label: t("flow.tcg_magic.choice2"),
						icon: "package",
						next: "rec_display",
					},
					{
						label: t("flow.tcg_magic.choice3"),
						icon: "cards",
						next: "rec_commander",
					},
					{
						label: t("flow.tcg_magic.choice4"),
						icon: "cards",
						next: "rec_card_single",
					},
				],
			},

			tcg_onepiece: {
				id: "tcg_onepiece",
				bot: [t("flow.tcg_op.bot1")],
				choices: [
					{
						label: t("flow.tcg_op.choice1"),
						icon: "box",
						next: "rec_booster_slim",
					},
					{
						label: t("flow.tcg_op.choice2"),
						icon: "box",
						next: "rec_onepiece_cs",
					},
					{
						label: t("flow.tcg_op.choice3"),
						icon: "package",
						next: "rec_display",
					},
				],
			},

			tcg_other: {
				id: "tcg_other",
				bot: [t("flow.tcg_other.bot1"), t("flow.tcg_other.bot2")],
				choices: [
					{
						label: t("flow.tcg_other.choice1"),
						icon: "box",
						next: "rec_booster_slim",
					},
					{
						label: t("flow.tcg_other.choice2"),
						icon: "gem",
						next: "rec_custom_dimensions",
					},
					{
						label: t("flow.tcg_other.choice3"),
						icon: "chat",
						next: "contact_conseil",
					},
				],
			},

			fig_type: {
				id: "fig_type",
				bot: [t("flow.fig_type.bot1"), t("flow.fig_type.bot2")],
				choices: [
					{
						label: t("flow.fig_type.choice1"),
						icon: "gamepad",
						next: "fig_amiibo",
					},
					{
						label: t("flow.fig_type.choice2"),
						icon: "figurine",
						next: "fig_nendoroid",
					},
					{
						label: t("flow.fig_type.choice3"),
						icon: "figurine",
						next: "fig_articulated",
					},
					{
						label: t("flow.fig_type.choice4"),
						icon: "trophy",
						next: "fig_large",
					},
					{
						label: t("flow.fig_type.choice5"),
						icon: "chat",
						next: "fig_contact",
					},
				],
			},

			fig_amiibo: {
				id: "fig_amiibo",
				bot: [t("flow.fig_amiibo.bot1"), t("flow.fig_amiibo.bot2")],
				product: {
					icon: "figurine",
					name: t("flow.rec_fig_m.prod.name"),
					price: t("flow.rec_fig_m.prod.price"),
					specs: [
						t("flow.rec_fig_m.prod.spec1"),
						t("flow.rec_fig_m.prod.spec2"),
						t("flow.rec_fig_m.prod.spec3"),
						t("flow.rec_fig_m.prod.spec4"),
					],
					cta: {
						label: t("flow.rec_fig_m.prod.cta"),
						href: "contact.html",
					},
					secondary: {
						label: t("flow.rec_fig_m.prod.sec"),
						href: "products.html",
					},
				},
				choices: [
					{
						label: t("flow.fig_amiibo.choice1"),
						icon: "cart",
						next: "redirect_contact",
					},
					{
						label: t("flow.fig_amiibo.choice2"),
						icon: "chat",
						next: "start",
					},
				],
			},

			fig_nendoroid: {
				id: "fig_nendoroid",
				bot: [t("flow.fig_nend.bot1"), t("flow.fig_nend.bot2")],
				choices: [
					{
						label: t("flow.fig_nend.choice1"),
						icon: "figurine",
						next: "rec_fig_m",
					},
					{
						label: t("flow.fig_nend.choice2"),
						icon: "figurine",
						next: "rec_custom_fig",
					},
				],
			},

			fig_articulated: {
				id: "fig_articulated",
				bot: [t("flow.fig_articu.bot1")],
				choices: [
					{
						label: t("flow.fig_articu.choice1"),
						icon: "figurine",
						next: "rec_fig_m",
					},
					{
						label: t("flow.fig_articu.choice2"),
						icon: "figurine",
						next: "rec_fig_l",
					},
					{
						label: t("flow.fig_articu.choice3"),
						icon: "figurine",
						next: "fig_large",
					},
				],
			},

			fig_large: {
				id: "fig_large",
				bot: [t("flow.fig_large.bot1"), t("flow.fig_large.bot2")],
				choices: [
					{
						label: t("flow.fig_large.choice1"),
						icon: "send",
						next: "redirect_contact",
					},
					{
						label: t("flow.fig_large.choice2"),
						icon: "chat",
						next: "start",
					},
				],
			},

			fig_contact: {
				id: "fig_contact",
				bot: [t("flow.fig_contact.bot1"), t("flow.fig_contact.bot2")],
				choices: [
					{
						label: t("flow.fig_contact.choice1"),
						icon: "email",
						next: "redirect_contact",
					},
					{
						label: t("flow.fig_contact.choice2"),
						icon: "arrow-left",
						next: "start",
					},
				],
			},

			sealed_type: {
				id: "sealed_type",
				bot: [t("flow.sealed.bot1"), t("flow.sealed.bot2")],
				choices: [
					{
						label: t("flow.sealed.choice1"),
						icon: "package",
						next: "rec_display",
					},
					{
						label: t("flow.sealed.choice2"),
						icon: "box",
						next: "rec_etb",
					},
					{
						label: t("flow.sealed.choice3"),
						icon: "gem",
						next: "rec_coffret",
					},
					{
						label: t("flow.sealed.choice4"),
						icon: "package",
						next: "rec_booster_box",
					},
					{
						label: t("flow.sealed.choice5"),
						icon: "sparkles",
						next: "rec_custom_dimensions",
					},
				],
			},

			custom_intro: {
				id: "custom_intro",
				bot: [
					t("flow.custom_intro.bot1"),
					t("flow.custom_intro.bot2"),
					t("flow.custom_intro.bot3"),
				],
				choices: [
					{
						label: t("flow.custom_intro.choice1"),
						icon: "pen",
						next: "custom_logo",
					},
					{
						label: t("flow.custom_intro.choice2"),
						icon: "gem",
						next: "custom_dims",
					},
					{
						label: t("flow.custom_intro.choice3"),
						icon: "store",
						next: "custom_pro",
					},
					{
						label: t("flow.custom_intro.choice4"),
						icon: "palette",
						next: "custom_fond",
					},
					{
						label: t("flow.custom_intro.choice5"),
						icon: "sparkles",
						next: "custom_autre",
					},
				],
			},

			custom_logo: {
				id: "custom_logo",
				bot: [t("flow.custom_logo.bot1"), t("flow.custom_logo.bot2")],
				choices: [
					{
						label: t("flow.custom_logo.choice1"),
						icon: "send",
						next: "redirect_contact",
					},
					{
						label: t("flow.custom_logo.choice2"),
						icon: "info",
						next: "info_custom",
					},
				],
			},

			custom_dims: {
				id: "custom_dims",
				bot: [t("flow.custom_dims.bot1"), t("flow.custom_dims.bot2")],
				choices: [
					{
						label: t("flow.custom_dims.choice1"),
						icon: "send",
						next: "redirect_contact",
					},
					{
						label: t("flow.custom_dims.choice2"),
						icon: "arrow-left",
						next: "start",
					},
				],
			},

			custom_pro: {
				id: "custom_pro",
				bot: [t("flow.custom_pro.bot1"), t("flow.custom_pro.bot2")],
				info: t("flow.custom_pro.info"),
				choices: [
					{
						label: t("flow.custom_pro.choice1"),
						icon: "store",
						next: "redirect_contact",
					},
					{
						label: t("flow.custom_pro.choice2"),
						icon: "chat",
						next: "start",
					},
				],
			},

			custom_fond: {
				id: "custom_fond",
				bot: [t("flow.custom_fond.bot1"), t("flow.custom_fond.bot2")],
				choices: [
					{
						label: t("flow.custom_fond.choice1"),
						icon: "send",
						next: "redirect_contact",
					},
					{
						label: t("flow.custom_fond.choice2"),
						icon: "arrow-left",
						next: "start",
					},
				],
			},

			custom_autre: {
				id: "custom_autre",
				bot: [t("flow.custom_autre.bot1")],
				choices: [
					{
						label: t("flow.custom_autre.choice1"),
						icon: "email",
						next: "redirect_contact",
					},
					{
						label: t("flow.custom_autre.choice2"),
						icon: "arrow-left",
						next: "start",
					},
				],
			},

			info_general: {
				id: "info_general",
				bot: [t("flow.info_gen.bot1")],
				choices: [
					{
						label: t("flow.info_gen.choice1"),
						icon: "gem",
						next: "info_pricing",
					},
					{
						label: t("flow.info_gen.choice2"),
						icon: "truck",
						next: "info_delivery",
					},
					{
						label: t("flow.info_gen.choice3"),
						icon: "microscope",
						next: "info_quality",
					},
					{
						label: t("flow.info_gen.choice4"),
						icon: "cart",
						next: "info_how_to_order",
					},
					{
						label: t("flow.info_gen.choice5"),
						icon: "check-badge",
						next: "info_sav",
					},
				],
			},

			info_pricing: {
				id: "info_pricing",
				bot: [t("flow.info_pricing.bot1")],
				info: t("flow.info_pricing.info"),
				choices: [
					{
						label: t("flow.info_pricing.choice1"),
						icon: "cards",
						next: "redirect_products",
					},
					{
						label: t("flow.info_pricing.choice2"),
						icon: "send",
						next: "redirect_contact",
					},
					{
						label: t("flow.info_pricing.choice3"),
						icon: "chat",
						next: "info_general",
					},
				],
			},

			info_delivery: {
				id: "info_delivery",
				bot: [t("flow.info_delivery.bot1")],
				info: t("flow.info_delivery.info"),
				choices: [
					{
						label: t("flow.info_delivery.choice1"),
						icon: "cart",
						next: "redirect_contact",
					},
					{
						label: t("flow.info_delivery.choice2"),
						icon: "chat",
						next: "info_general",
					},
				],
			},

			info_quality: {
				id: "info_quality",
				bot: [t("flow.info_quality.bot1")],
				info: t("flow.info_quality.info"),
				choices: [
					{
						label: t("flow.info_quality.choice1"),
						icon: "shield",
						next: "start",
					},
					{
						label: t("flow.info_quality.choice2"),
						icon: "chat",
						next: "info_general",
					},
				],
			},

			info_how_to_order: {
				id: "info_how_to_order",
				bot: [t("flow.info_order.bot1")],
				info: t("flow.info_order.info"),
				choices: [
					{
						label: t("flow.info_order.choice1"),
						icon: "cart",
						next: "redirect_contact",
					},
					{
						label: t("flow.info_order.choice2"),
						icon: "cards",
						next: "redirect_products",
					},
					{
						label: t("flow.info_order.choice3"),
						icon: "chat",
						next: "info_general",
					},
				],
			},

			info_sav: {
				id: "info_sav",
				bot: [t("flow.info_sav.bot1")],
				info: t("flow.info_sav.info"),
				choices: [
					{
						label: t("flow.info_sav.choice1"),
						icon: "email",
						next: "redirect_contact",
					},
					{
						label: t("flow.info_sav.choice2"),
						icon: "arrow-left",
						next: "start",
					},
				],
			},

			info_custom: {
				id: "info_custom",
				bot: [t("flow.info_pricing.bot1")],
				info: t("flow.info_custom.info"),
				choices: [
					{
						label: t("flow.info_custom.choice1"),
						icon: "send",
						next: "redirect_contact",
					},
					{
						label: t("flow.info_custom.choice2"),
						icon: "arrow-left",
						next: "start",
					},
				],
			},

			contact_conseil: {
				id: "contact_conseil",
				bot: [t("flow.contact_conseil.bot1")],
				choices: [
					{
						label: t("flow.contact_conseil.choice1"),
						icon: "email",
						next: "redirect_contact",
					},
					{
						label: t("flow.contact_conseil.choice2"),
						icon: "arrow-left",
						next: "start",
					},
				],
			},

			rec_booster_slim: {
				id: "rec_booster_slim",
				bot: [t("flow.rec_slim.bot1")],
				product: {
					icon: "cards",
					name: t("flow.rec_slim.prod.name"),
					price: t("flow.rec_slim.prod.price"),
					specs: [
						t("flow.rec_slim.prod.spec1"),
						t("flow.rec_slim.prod.spec2"),
						t("flow.rec_slim.prod.spec3"),
						t("flow.rec_slim.prod.spec4"),
					],
					cta: {
						label: t("flow.rec_slim.prod.cta"),
						href: "contact.html",
					},
					secondary: {
						label: t("flow.rec_slim.prod.sec"),
						href: "products.html",
					},
				},
				choices: [
					{
						label: t("flow.rec_slim.choice1"),
						icon: "cart",
						next: "redirect_contact",
					},
					{
						label: t("flow.rec_slim.choice2"),
						icon: "chat",
						next: "info_general",
					},
					{
						label: t("flow.rec_slim.choice3"),
						icon: "arrow-left",
						next: "start",
					},
				],
			},

			rec_etb: {
				id: "rec_etb",
				bot: [t("flow.rec_etb.bot1")],
				product: {
					icon: "box",
					name: t("flow.rec_etb.prod.name"),
					price: t("flow.rec_etb.prod.price"),
					specs: [
						t("flow.rec_etb.prod.spec1"),
						t("flow.rec_etb.prod.spec2"),
						t("flow.rec_etb.prod.spec3"),
						t("flow.rec_etb.prod.spec4"),
					],
					cta: {
						label: t("flow.rec_etb.prod.cta"),
						href: "contact.html",
					},
					secondary: {
						label: t("flow.rec_etb.prod.sec"),
						href: "products.html",
					},
				},
				choices: [
					{
						label: t("flow.rec_etb.choice1"),
						icon: "cart",
						next: "redirect_contact",
					},
					{
						label: t("flow.rec_etb.choice2"),
						icon: "chat",
						next: "info_general",
					},
					{
						label: t("flow.rec_etb.choice3"),
						icon: "arrow-left",
						next: "start",
					},
				],
			},

			rec_display: {
				id: "rec_display",
				bot: [t("flow.rec_display.bot1")],
				product: {
					icon: "package",
					name: t("flow.rec_display.prod.name"),
					price: t("flow.rec_display.prod.price"),
					specs: [
						t("flow.rec_display.prod.spec1"),
						t("flow.rec_display.prod.spec2"),
						t("flow.rec_display.prod.spec3"),
						t("flow.rec_display.prod.spec4"),
					],
					cta: {
						label: t("flow.rec_display.prod.cta"),
						href: "contact.html",
					},
					secondary: {
						label: t("flow.rec_display.prod.sec"),
						href: "products.html",
					},
				},
				choices: [
					{
						label: t("flow.rec_display.choice1"),
						icon: "cart",
						next: "redirect_contact",
					},
					{
						label: t("flow.rec_display.choice2"),
						icon: "chat",
						next: "info_general",
					},
					{
						label: t("flow.rec_display.choice3"),
						icon: "arrow-left",
						next: "start",
					},
				],
			},

			rec_onepiece_cs: {
				id: "rec_onepiece_cs",
				bot: [t("flow.rec_op.bot1")],
				product: {
					icon: "pirate",
					name: t("flow.rec_op.prod.name"),
					price: t("flow.rec_op.prod.price"),
					specs: [
						t("flow.rec_op.prod.spec1"),
						t("flow.rec_op.prod.spec2"),
						t("flow.rec_op.prod.spec3"),
						t("flow.rec_op.prod.spec4"),
					],
					cta: {
						label: t("flow.rec_op.prod.cta"),
						href: "contact.html",
					},
					secondary: {
						label: t("flow.rec_op.prod.sec"),
						href: "products.html",
					},
				},
				choices: [
					{
						label: t("flow.rec_op.choice1"),
						icon: "cart",
						next: "redirect_contact",
					},
					{
						label: t("flow.rec_op.choice2"),
						icon: "chat",
						next: "info_general",
					},
					{
						label: t("flow.rec_op.choice3"),
						icon: "arrow-left",
						next: "start",
					},
				],
			},

			rec_card_single: {
				id: "rec_card_single",
				bot: [t("flow.rec_card.bot1"), t("flow.rec_card.bot2")],
				choices: [
					{
						label: t("flow.rec_card.choice1"),
						icon: "cards",
						next: "rec_booster_slim",
					},
					{
						label: t("flow.rec_card.choice2"),
						icon: "sparkles",
						next: "redirect_contact",
					},
					{
						label: t("flow.rec_card.choice3"),
						icon: "chat",
						next: "contact_conseil",
					},
				],
			},

			rec_commander: {
				id: "rec_commander",
				bot: [
					t("flow.rec_commander.bot1"),
					t("flow.rec_commander.bot2"),
				],
				choices: [
					{
						label: t("flow.rec_commander.choice1"),
						icon: "cards",
						next: "rec_booster_slim",
					},
					{
						label: t("flow.rec_commander.choice2"),
						icon: "sparkles",
						next: "redirect_contact",
					},
				],
			},

			rec_coffret: {
				id: "rec_coffret",
				bot: [t("flow.rec_coffret.bot1"), t("flow.rec_coffret.bot2")],
				choices: [
					{
						label: t("flow.rec_coffret.choice1"),
						icon: "send",
						next: "redirect_contact",
					},
					{
						label: t("flow.rec_coffret.choice2"),
						icon: "chat",
						next: "start",
					},
				],
			},

			rec_booster_box: {
				id: "rec_booster_box",
				bot: [t("flow.rec_bbox.bot1"), t("flow.rec_bbox.bot2")],
				choices: [
					{
						label: t("flow.rec_bbox.choice1"),
						icon: "send",
						next: "redirect_contact",
					},
					{
						label: t("flow.rec_bbox.choice2"),
						icon: "chat",
						next: "start",
					},
				],
			},

			rec_fig_m: {
				id: "rec_fig_m",
				bot: [t("flow.rec_fig_m.bot1")],
				product: {
					icon: "figurine",
					name: t("flow.rec_fig_m.prod.name"),
					price: t("flow.rec_fig_m.prod.price"),
					specs: [
						t("flow.rec_fig_m.prod.spec1"),
						t("flow.rec_fig_m.prod.spec2"),
						t("flow.rec_fig_m.prod.spec3"),
						t("flow.rec_fig_m.prod.spec4"),
					],
					cta: {
						label: t("flow.rec_fig_m.prod.cta"),
						href: "contact.html",
					},
					secondary: {
						label: t("flow.rec_fig_m.prod.sec"),
						href: "products.html",
					},
				},
				choices: [
					{
						label: t("flow.rec_fig_m.choice1"),
						icon: "cart",
						next: "redirect_contact",
					},
					{
						label: t("flow.rec_fig_m.choice2"),
						icon: "chat",
						next: "info_general",
					},
					{
						label: t("flow.rec_fig_m.choice3"),
						icon: "arrow-left",
						next: "start",
					},
				],
			},

			rec_fig_l: {
				id: "rec_fig_l",
				bot: [t("flow.rec_fig_l.bot1"), t("flow.rec_fig_l.bot2")],
				choices: [
					{
						label: t("flow.rec_fig_l.choice1"),
						icon: "figurine",
						next: "redirect_contact",
					},
					{
						label: t("flow.rec_fig_l.choice2"),
						icon: "chat",
						next: "start",
					},
				],
			},

			rec_custom_dimensions: {
				id: "rec_custom_dimensions",
				bot: [t("flow.rec_custom_d.bot1"), t("flow.rec_custom_d.bot2")],
				choices: [
					{
						label: t("flow.rec_custom_d.choice1"),
						icon: "send",
						next: "redirect_contact",
					},
					{
						label: t("flow.rec_custom_d.choice2"),
						icon: "arrow-left",
						next: "start",
					},
				],
			},

			rec_custom_fig: {
				id: "rec_custom_fig",
				bot: [t("flow.rec_custom_fig.bot1")],
				choices: [
					{
						label: t("flow.rec_custom_fig.choice1"),
						icon: "send",
						next: "redirect_contact",
					},
					{
						label: t("flow.rec_custom_fig.choice2"),
						icon: "figurine",
						next: "rec_fig_m",
					},
				],
			},

		redirect_contact: {
			id: "redirect_contact",
			bot: [t("flow.redirect_contact.bot1")],
			choices: [
				{
					label: t("flow.redirect_contact.cta"),
					icon: "send",
					href: "contact.html",
				},
				{
					label: t("flow.choice.backmenu"),
					icon: "arrow-left",
					next: "start",
				},
			],
		},

		redirect_products: {
			id: "redirect_products",
			bot: [t("flow.redirect_products.bot1")],
			choices: [
				{
					label: t("flow.redirect_products.cta"),
					icon: "cards",
					href: "products.html",
				},
				{
					label: t("flow.choice.backmenu"),
					icon: "arrow-left",
					next: "start",
				},
			],
		},

			feedback: {
				id: "feedback",
				bot: ["Comment s'est passé votre visite ?"],
				rating: true,
			},
		};
	};

	let FLOW = null;

	/* State */
	const state = { open: false, currentNode: null, history: [] };

	/* DOM refs */
	let widget,
		launcher,
		badge,
		window_,
		messagesEl,
		inputEl,
		sendBtn,
		chipsContainer;

	/* Avatar SVG (reused in multiple places) */
	const AVATAR_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:13px;height:13px;color:#0a0c10"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;

	/* Build skeleton */

	const build = () => {
		widget = document.createElement("div");
		widget.className = "cb-widget";

		/* Launcher button */
		launcher = document.createElement("button");
		launcher.className = "cb-launcher";
		launcher.setAttribute("aria-label", i18n.t("cb.open.aria"));
		launcher.innerHTML = `
		<span class="cb-launcher-icon cb-launcher-icon-chat">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
			</svg>
		</span>
		<span class="cb-launcher-icon cb-launcher-icon-close">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
				<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
			</svg>
		</span>`;

		badge = document.createElement("span");
		badge.className = "cb-badge";
		badge.textContent = "1";
		launcher.appendChild(badge);

		/* Chat window */
		window_ = document.createElement("div");
		window_.className = "cb-window";
		window_.setAttribute("role", "dialog");
		window_.setAttribute("aria-label", "Assistant Items Protect");

		/* Header */
		const header = document.createElement("div");
		header.className = "cb-header";
		header.innerHTML = `
		<div class="cb-header-avatar">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px;color:#0a0c10">
				<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
			</svg>
		</div>
		<div class="cb-header-info">
			<div class="cb-header-name">${i18n.t("cb.header.name")}</div>
			<div class="cb-header-status">
				<span class="cb-status-dot"></span>
				${i18n.t("cb.header.status")}
			</div>
		</div>
		<div class="cb-header-actions">
			<button class="cb-header-btn cb-btn-history" aria-label="${i18n.t("cb.history.title")}">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
				</svg>
			</button>
			<button class="cb-header-btn cb-btn-restart" aria-label="${i18n.t("cb.restart.aria")}">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
					<polyline points="1 4 1 10 7 10"/>
					<path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
				</svg>
			</button>
			<button class="cb-header-btn cb-btn-close" aria-label="${i18n.t("cb.close.aria")}">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
					<polyline points="6 9 12 15 18 9"/>
				</svg>
			</button>
		</div>`;

		/* Messages */
		messagesEl = document.createElement("div");
		messagesEl.className = "cb-messages";

		/* Input area */
		const inputArea = document.createElement("div");
		inputArea.className = "cb-input-area";

		inputEl = document.createElement("input");
		inputEl.className = "cb-input";
		inputEl.type = "text";
		inputEl.placeholder = i18n.t("cb.input.placeholder");
		inputEl.setAttribute("data-i18n-placeholder", "cb.input.placeholder");
		inputEl.setAttribute("autocomplete", "off");
		inputEl.maxLength = 300;

		sendBtn = document.createElement("button");
		sendBtn.className = "cb-send-btn";
		sendBtn.setAttribute("aria-label", i18n.t("cb.send.aria"));
		sendBtn.innerHTML = `
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
			<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
		</svg>`;

		inputArea.appendChild(inputEl);
		inputArea.appendChild(sendBtn);

		/* Footer */
		const footer = document.createElement("div");
		footer.className = "cb-footer";
		footer.setAttribute("data-i18n", "cb.footer");
		footer.textContent = i18n.t("cb.footer");

		window_.appendChild(header);
		window_.appendChild(messagesEl);
		window_.appendChild(inputArea);
		window_.appendChild(footer);

		/* History panel */
		const historyPanel = document.createElement("div");
		historyPanel.className = "cb-history-panel";
		historyPanel.id = "cbHistoryPanel";
		historyPanel.innerHTML = `
		<div class="cb-history-header">
			<span>${i18n.t("cb.history.title")}</span>
			<button class="cb-header-btn cb-btn-history-close" aria-label="${i18n.t("cb.history.close.aria")}">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
					<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
				</svg>
			</button>
		</div>
		<div class="cb-history-list" id="cbHistoryList"></div>`;
		window_.appendChild(historyPanel);

		widget.appendChild(launcher);
		widget.appendChild(window_);
		document.body.appendChild(widget);

		bindEvents();
	};

	/* Events */

	const bindEvents = () => {
		launcher.addEventListener("click", toggleWidget);
		widget
			.querySelector(".cb-btn-close")
			.addEventListener("click", closeWidget);
		widget
			.querySelector(".cb-btn-restart")
			.addEventListener("click", restartChat);
		widget
			.querySelector(".cb-btn-history")
			.addEventListener("click", toggleHistoryPanel);
		widget
			.querySelector(".cb-btn-history-close")
			.addEventListener("click", closeHistoryPanel);

		sendBtn.addEventListener("click", handleTextSend);

		inputEl.addEventListener("keydown", (e) => {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				handleTextSend();
			}
		});

		inputEl.addEventListener("input", () => {
			sessionStorage.setItem("cbDraft", inputEl.value);
		});
	};

	const toggleWidget = () => (state.open ? closeWidget() : openWidget());

	const openWidget = () => {
		state.open = true;
		widget.classList.add("cb-open");
		launcher.setAttribute("aria-expanded", "true");
		hideBadge();

		if (!state.currentNode) {
			addDaySeparator();
			goToNode("start");
		}

		const draft = sessionStorage.getItem("cbDraft");
		if (draft) inputEl.value = draft;

		setTimeout(() => inputEl.focus(), 280);
	};

	const closeWidget = () => {
		state.open = false;
		widget.classList.remove("cb-open");
		launcher.setAttribute("aria-expanded", "false");
	};

	const hideBadge = () => badge.classList.add("cb-badge-hide");

	const restartChat = () => {
		saveChatToHistory("restart");
		messagesEl.innerHTML = "";
		state.currentNode = null;
		state.history = [];
		addDaySeparator();
		goToNode("start");
	};

	/* Navigation */

	/**
	 * Navigate to a conversation node.
	 * @param {string} nodeId - Key in the FLOW map.
	 */
	const goToNode = (nodeId) => {
		const node = FLOW[nodeId];
		if (!node) return;

		state.currentNode = node;
		state.history.push(nodeId);

		clearChips();

		const messages = node.bot ?? [];
		let delay = 0;

		/* Render bot messages with staggered typing indicators */
		messages.forEach((msg, i) => {
			const typingDelay = delay;
			const msgDelay = delay + 950;
			delay = msgDelay + 180;

			const isFirst = i === 0;
			const isLast  = i === messages.length - 1;

			setTimeout(showTyping, typingDelay);
			setTimeout(() => {
				hideTyping();
				appendBotMsg(msg, isFirst, isLast);
			}, msgDelay);
		});

		let afterDelay = delay + 200;

		if (node.product) {
			setTimeout(() => appendProductCard(node.product), afterDelay);
			afterDelay += 100;
		}
		if (node.info) {
			setTimeout(() => appendInfoBloc(node.info), afterDelay);
			afterDelay += 100;
		}
		if (node.choices?.length > 0) {
			setTimeout(() => renderChips(node.choices), afterDelay);
		}
		if (node.end) {
			setTimeout(() => appendRestartBtn(), afterDelay + 100);
			setTimeout(renderFeedback, afterDelay + 500);
		}
	};

	/* Typing indicator */

	let typingRow = null;

	const showTyping = () => {
		if (typingRow) return;
		typingRow = document.createElement("div");
		typingRow.className = "cb-typing-row";
		typingRow.innerHTML = `
		<div class="cb-msg-avatar">${AVATAR_SVG}</div>
		<div class="cb-typing-dots"><span></span><span></span><span></span></div>`;
		messagesEl.appendChild(typingRow);
		scrollToBottom();
	};

	const hideTyping = () => {
		typingRow?.remove();
		typingRow = null;
	};

	/* Message builders */

	/**
	 * Append a bot message bubble.
	 * @param {string} html     - Inner HTML content (may include tags).
	 * @param {boolean} isFirst - First message in a consecutive sequence → show avatar.
	 * @param {boolean} isLast  - Last message in a consecutive sequence → show timestamp.
	 */
	const appendBotMsg = (html, isFirst = true, isLast = true) => {
		const row = document.createElement("div");
		row.className = `cb-msg-row cb-bot${isFirst ? " cb-bot-first" : " cb-bot-continued"}${isLast ? " cb-bot-last" : ""}`;
		row.innerHTML = `
		<div class="cb-msg-avatar">${AVATAR_SVG}</div>
		<div class="cb-bot-content">
			<div class="cb-bubble">${html}</div>
			${isLast ? `<div class="cb-timestamp">${now()}</div>` : ""}
		</div>`;
		messagesEl.appendChild(row);
		scrollToBottom();
	};

	/**
	 * Append a user message bubble.
	 * @param {string} text - Plain text (will be escaped).
	 */
	const appendUserMsg = (text) => {
		const row = document.createElement("div");
		row.className = "cb-msg-row cb-user";
		row.innerHTML = `
		<div>
			<div class="cb-bubble">${esc(text)}</div>
			<div class="cb-timestamp">${now()}</div>
		</div>`;
		messagesEl.appendChild(row);
		scrollToBottom();
	};

	/**
	 * Append a product recommendation card.
	 * @param {{ icon: string, name: string, price: string, specs: string[], cta: Object, secondary: Object }} p
	 */
	const appendProductCard = (p) => {
		const specsHtml = p.specs
			.map((s) => `<div class="cb-product-card-spec"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>${esc(s)}</div>`)
			.join("");
		const card = document.createElement("div");
		card.className = "cb-product-card";
		card.innerHTML = `
		<div class="cb-product-card-band">
			<div class="cb-product-card-band-inner">
				<div class="cb-product-card-icon">
					<img src="assets/icons/${esc(p.icon)}.svg" alt="">
				</div>
				<div class="cb-product-card-identity">
					<div class="cb-product-card-name">${p.name}</div>
					<div class="cb-product-card-price">${esc(p.price)}</div>
				</div>
			</div>
		</div>
		<div class="cb-product-card-body">
			<div class="cb-product-card-specs">${specsHtml}</div>
			<div class="cb-product-card-actions">
				<a class="cb-btn-primary" href="${esc(p.cta.href)}">${esc(p.cta.label)}</a>
				<a class="cb-btn-secondary" href="${esc(p.secondary.href)}">${esc(p.secondary.label)}</a>
			</div>
		</div>`;
		messagesEl.appendChild(card);
		scrollToBottom();
	};

	/**
	 * Append an info bloc with pre-formatted HTML.
	 * @param {string} html
	 */
	const appendInfoBloc = (html) => {
		const bloc = document.createElement("div");
		bloc.className = "cb-info-bloc";
		bloc.innerHTML = html;
		messagesEl.appendChild(bloc);
		scrollToBottom();
	};

	const appendRestartBtn = () => {
		const btn = document.createElement("button");
		btn.className = "cb-restart";
		btn.textContent = i18n.t("cb.restart.btn");
		btn.addEventListener("click", restartChat);
		messagesEl.appendChild(btn);
		scrollToBottom();
	};

	const addDaySeparator = () => {
		const sep = document.createElement("div");
		sep.className = "cb-day-sep";
		sep.textContent = i18n.t("cb.daysep");
		messagesEl.appendChild(sep);
	};

	/** Render a star-rating feedback widget. Shows once per session. */
	const renderFeedback = () => {
		if (sessionStorage.getItem("cbFeedbackDone")) return;

		const container = document.createElement("div");
		container.className = "cb-rating";

		const label = document.createElement("div");
		label.className = "cb-rating-label";
		label.textContent = i18n.t("cb.rating.label");

		const starsEl = document.createElement("div");
		starsEl.className = "cb-rating-stars";

		for (let score = 1; score <= 5; score++) {
			const btn = document.createElement("button");
			btn.className = "cb-star";
			btn.setAttribute(
				"aria-label",
				`${score} étoile${score > 1 ? "s" : ""}`,
			);
			btn.textContent = "★";

			btn.addEventListener("click", () => {
				sessionStorage.setItem("cbFeedbackDone", "1");
				localStorage.setItem(
					"cbRating",
					JSON.stringify({ score, date: new Date().toISOString() }),
				);
				container.innerHTML = `<div class="cb-rating-thanks">${i18n.t("cb.rating.thanks")}</div>`;
				scrollToBottom();
			});

			btn.addEventListener("mouseenter", () => {
				starsEl.querySelectorAll(".cb-star").forEach((s, idx) => {
					s.classList.toggle("cb-star-highlight", idx < score);
				});
			});

			starsEl.appendChild(btn);
		}

		starsEl.addEventListener("mouseleave", () => {
			starsEl
				.querySelectorAll(".cb-star")
				.forEach((s) => s.classList.remove("cb-star-highlight"));
		});

		container.appendChild(label);
		container.appendChild(starsEl);
		messagesEl.appendChild(container);
		scrollToBottom();
	};

	/* Chips */

	/**
	 * Render quick-reply chip buttons below the last message.
	 * @param {{ label: string, icon?: string, next: string }[]} choices
	 */
	const renderChips = (choices) => {
		clearChips();
		const row = document.createElement("div");
		row.className = "cb-chips-row";

		choices.forEach((choice) => {
			const chip = document.createElement("button");
			chip.className = "cb-chip";
			const iconHtml = choice.icon
				? `<img src="assets/icons/${esc(choice.icon)}.svg" alt="">`
				: "";
			chip.innerHTML = `${iconHtml}${esc(choice.label)}`;
			chip.addEventListener("click", () => handleChipClick(choice));
			row.appendChild(chip);
		});

		chipsContainer = row;
		messagesEl.appendChild(row);
		scrollToBottom();
	};

	const clearChips = () => {
		chipsContainer?.remove();
		chipsContainer = null;
	};

	/**
	 * Handle quick-reply chip selection.
	 * @param {{ label: string, next: string }} choice
	 */
	const handleChipClick = (choice) => {
		clearChips();
		appendUserMsg(choice.label);
		if (choice.href) {
			window.location.href = choice.href;
		} else {
			goToNode(choice.next);
		}
	};

	/* Free text input */

	const handleTextSend = () => {
		const text = inputEl.value.trim();
		inputEl.value = "";
		sessionStorage.removeItem("cbDraft");
		if (!text) return;

		clearChips();
		appendUserMsg(text);

		const lower = text.toLowerCase();
		const keywordMap = [
			{ keys: ["booster", "slim", "pack"], node: "rec_booster_slim" },
			{ keys: ["etb", "elite trainer", "trainer box"], node: "rec_etb" },
			{ keys: ["display", "36 booster"], node: "rec_display" },
			{ keys: ["figurine", "amiibo", "nendoroid"], node: "fig_type" },
			{ keys: ["pokemon", "pokémon"], node: "tcg_pokemon_format" },
			{ keys: ["yu-gi-oh", "yugioh", "ygo"], node: "tcg_ygo_format" },
			{ keys: ["magic", "mtg", "gathering"], node: "tcg_magic_format" },
			{ keys: ["one piece", "onepiece"], node: "tcg_onepiece" },
			{
				keys: ["sur mesure", "custom", "personnalis"],
				node: "custom_intro",
			},
			{
				keys: ["prix", "tarif", "combien", "coût", "coute"],
				node: "info_pricing",
			},
			{
				keys: ["livraison", "délai", "délais", "envoi"],
				node: "info_delivery",
			},
			{
				keys: ["qualit", "matériau", "acrylique", "matière"],
				node: "info_quality",
			},
			{
				keys: ["commander", "commande", "order"],
				node: "info_how_to_order",
			},
			{
				keys: ["contact", "email", "discord", "instagram"],
				node: "redirect_contact",
			},
			{
				keys: ["sav", "garantie", "retour", "remboursement"],
				node: "info_sav",
			},
		];

		const match = keywordMap.find(({ keys }) =>
			keys.some((k) => lower.includes(k)),
		);
		if (match) {
			goToNode(match.node);
		} else {
			setTimeout(showTyping, 200);
			setTimeout(() => {
				hideTyping();
				appendBotMsg(i18n.t("cb.fallback"));
				renderChips(FLOW["start"].choices);
			}, 600);
		}
	};

	/* Scroll */

	const scrollToBottom = () => {
		setTimeout(() => {
			messagesEl.scrollTop = messagesEl.scrollHeight;
		}, 20);
	};

	/* History */

	/**
	 * Persist current conversation to localStorage history.
	 * @param {string} [reason] - 'restart' | 'end'
	 */
	const saveChatToHistory = (reason) => {
		if (!messagesEl) return;
		const msgs = Array.from(messagesEl.querySelectorAll(".cb-bubble")).map(
			(b) => ({
				text: b.textContent.trim(),
				user: b.closest(".cb-user") !== null,
			}),
		);
		if (msgs.length < 2) return;

		const preview = msgs.find((m) => !m.user);
		const history = JSON.parse(localStorage.getItem("cbHistory") ?? "[]");
		history.unshift({
			date: new Date().toISOString(),
			preview: preview ? preview.text.slice(0, 60) : "Conversation",
			msgs: msgs.slice(0, 10),
		});
		if (history.length > 12) history.length = 12;
		localStorage.setItem("cbHistory", JSON.stringify(history));
	};

	/** Render conversation history in the panel. */
	const renderHistoryPanel = () => {
		const list = document.getElementById("cbHistoryList");
		if (!list) return;
		const history = JSON.parse(localStorage.getItem("cbHistory") ?? "[]");
		if (!history.length) {
			list.innerHTML = `<p class="cb-history-empty">${i18n.t("cb.history.empty")}</p>`;
			return;
		}
		list.innerHTML = history
			.map((item) => {
				const d = new Date(item.date);
				const label = `${d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })} ${d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`;
				return `
			<div class="cb-history-item">
				<div class="cb-history-item-meta">${label}</div>
				<div class="cb-history-item-preview">${item.preview ?? "..."}</div>
			</div>`;
			})
			.join("");
	};

	/** Toggle the history side panel. */
	const toggleHistoryPanel = () => {
		const panel = document.getElementById("cbHistoryPanel");
		if (!panel) return;
		if (panel.classList.contains("cb-history-open")) closeHistoryPanel();
		else {
			renderHistoryPanel();
			panel.classList.add("cb-history-open");
		}
	};

	const closeHistoryPanel = () => {
		document
			.getElementById("cbHistoryPanel")
			?.classList.remove("cb-history-open");
	};

	/* Init */

	const init = () => {
		FLOW = buildFlow();
		build();

		/* Show badge after 3s to invite interaction */
		setTimeout(() => {
			if (!state.open) badge.style.display = "flex";
		}, 3000);

		/* Rebuild FLOW and restart when language changes */
		document.addEventListener("languagechange", () => {
			FLOW = buildFlow();
			if (inputEl) inputEl.placeholder = i18n.t("cb.input.placeholder");
			if (state.currentNode) restartChat();
		});
	};

	/* Wait for i18n locale to be loaded before initialising */
	const _start = () => {
		if (typeof i18n !== "undefined" && i18n.ready) {
			if (document.readyState === "loading")
				document.addEventListener("DOMContentLoaded", init);
			else init();
		} else {
			document.addEventListener("i18nready", init, { once: true });
		}
	};

	_start();
})();
