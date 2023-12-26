/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				tekhelet: "rgba(61, 52, 139, 1)",
				"disabled-tekhelet": "rgba(61, 52, 139, 0.3)",
				iris: "rgba(90, 86, 188, 1)",
				"medium-slate-blue": "rgba(118, 120, 237, 1)",
				tangerine: "rgba(241, 135, 1, 1)",
				danger: "rgba(241, 50, 50, 1)",
				persimmon: "rgba(243, 91, 4, 1)",
				"selective-yellow": "rgba(247, 184, 1, 1)",
			},
			fontFamily: {
				HakgyoansimUndongjangL: ["HakgyoansimUndongjangL"],
			},
		},
	},
	plugins: [],
};
