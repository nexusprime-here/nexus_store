/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			colors: {
				muted: "rgba(255,255,255,0.2)",
				"foreground": "rgb(var(--foreground-rgb))",
				"detail": "rgb(var(--detail-rgb))",
			},
			fontFamily: {
				"poiret-one": "'Poiret One',cursive;",
			},
		},
		textColor: {
			primary: "white",
			secoundary: "rgba(255,255,255,0.7)",
		},
	},
	plugins: [],
};
