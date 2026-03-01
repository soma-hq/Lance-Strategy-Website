/* Animated canvas particles — rising fire/water + ambient dots */
(() => {
	const canvas = document.getElementById("particleCanvas");
	if (!canvas) return;

	const ctx = canvas.getContext("2d");

	/** Resize canvas to match viewport. */
	const resizeCanvas = () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	};

	resizeCanvas();
	window.addEventListener("resize", resizeCanvas, { passive: true });

	const PARTICLE_COUNT = 80;
	const STATIC_DOT_COUNT = 55;

	class Particle {
		/**
		 * Create a particle and initialize its state.
		 * @param {boolean} [init=false] - Spread Y randomly across viewport on creation.
		 */
		constructor(init = false) {
			this.reset(init);
		}

		/**
		 * Reset particle to a new initial state.
		 * @param {boolean} [init=false] - If true, randomize Y across viewport; otherwise spawn at bottom.
		 */
		reset(init = false) {
			this.x = Math.random() * canvas.width;
			this.type = Math.random() < 0.5 ? "fire" : "water";
			this.y = init ? Math.random() * canvas.height : canvas.height + 20;
			this.size = 2 + Math.random() * 4;
			this.speedY = -(0.4 + Math.random() * 1.2);
			this.speedX = (Math.random() - 0.5) * 0.5;
			this.life = 0;
			this.maxLife = 120 + Math.random() * 180;
			this.wobble = Math.random() * Math.PI * 2;
			this.wobbleSpeed = 0.02 + Math.random() * 0.03;

			const hue =
				this.type === "fire"
					? 10 + Math.random() * 30
					: 185 + Math.random() * 20;
			const saturation = this.type === "fire" ? 95 : 80;
			const lightness =
				this.type === "fire"
					? 55 + Math.random() * 20
					: 60 + Math.random() * 20;
			this.color = `hsl(${hue},${saturation}%,${lightness}%)`;
		}

		/** Advance particle position and lifecycle. */
		update() {
			this.life++;
			this.wobble += this.wobbleSpeed;
			this.x += this.speedX + Math.sin(this.wobble) * 0.3;
			this.y += this.speedY;
			if (this.life >= this.maxLife || this.y < -20) this.reset(false);
		}

		/** Draw particle onto canvas context. */
		draw() {
			const progress = this.life / this.maxLife;
			let alpha;

			if (progress < 0.2) alpha = progress / 0.2;
			else if (progress > 0.75) alpha = (1 - progress) / 0.25;
			else alpha = 1;

			const sz = this.size * (1 - progress * 0.4);

			ctx.save();
			ctx.globalAlpha = alpha * 0.75;
			ctx.fillStyle = this.color;
			ctx.shadowColor = this.color;
			ctx.shadowBlur = this.type === "fire" ? 6 : 10;
			ctx.beginPath();
			ctx.arc(this.x, this.y, Math.max(0.5, sz), 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		}
	}

	/* Particle pool */
	const particles = Array.from(
		{ length: PARTICLE_COUNT },
		() => new Particle(true),
	);

	/* Static ambient dots */
	const staticDots = Array.from({ length: STATIC_DOT_COUNT }, () => {
		const isGold = Math.random() < 0.35;
		const isFire = !isGold && Math.random() < 0.5;
		const color = isGold
			? "rgba(201,168,76,"
			: isFire
				? "rgba(249,115,22,"
				: "rgba(6,182,212,";
		const glow = isGold
			? "rgba(201,168,76,0.6)"
			: isFire
				? "rgba(249,115,22,0.6)"
				: "rgba(6,182,212,0.6)";
		return {
			xRatio: Math.random(),
			yRatio: Math.random(),
			size: 1.5 + Math.random() * 2.5,
			color,
			glow,
			pulseOffset: Math.random() * Math.PI * 2,
			pulseSpeed: 0.008 + Math.random() * 0.018,
		};
	});

	/* Animation loop */
	const animate = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (const p of particles) {
			p.update();
			p.draw();
		}

		const t = performance.now() / 1000;
		for (const d of staticDots) {
			const pulse =
				0.3 +
				0.7 *
					(0.5 +
						0.5 * Math.sin(t * d.pulseSpeed * 60 + d.pulseOffset));
			const x = d.xRatio * canvas.width;
			const y = d.yRatio * canvas.height;

			ctx.save();
			ctx.globalAlpha = pulse * 0.55;
			ctx.fillStyle = `${d.color}${pulse})`;
			ctx.shadowColor = d.glow;
			ctx.shadowBlur = 8;
			ctx.beginPath();
			ctx.arc(x, y, d.size, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		}

		requestAnimationFrame(animate);
	};

	animate();
})();
