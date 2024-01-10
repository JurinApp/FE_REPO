/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				tekhelet: "rgba(61, 52, 139, 1)",
				"btn-cancel-tekhelet": "rgba(61, 52, 139, 0.05)",
				"btn-cancel": "rgba(245,245,249,1)",
				"disabled-tekhelet": "rgba(61, 52, 139, 0.3)",
				iris: "rgba(90, 86, 188, 1)",
				"medium-slate-blue": "rgba(118, 120, 237, 1)",
				tangerine: "rgba(241, 135, 1, 1)",
				danger: "rgba(241, 50, 50, 1)",
				"disabled-danger": "rgba(241,50,50,0.5)",
				persimmon: "rgba(243, 91, 4, 1)",
				"selective-yellow": "rgba(247, 184, 1, 1)",
				"black-100": "rgba(0,0,0,0.1)",
				"black-200": "rgba(0,0,0,0.2)",
				"black-300": "rgba(0,0,0,0.3)",
				"black-700": "rgba(0,0,0,0.7)",
				"black-800": "rgba(0,0,0,0.8)",
				"black-900": "rgba(0,0,0,0.9)",
				"stock-blue": "rgba(0,117,255,1)",
				"stock-red": "rgba(224,23,23,1)",
			},
			width: {
				"box-width": "22.563rem",
				"item-width": "21.8rem",
				"modal-width": "20.813rem",
			},
			height: {
				"body-height": "calc(100vh - 2.938rem - 4.188rem)",
				"manage-height": "calc(100vh - 22rem)",
				"box-height": "3.25rem",
				"inTrade-height": "calc(100vh - 10.7rem)",
			},
			fontFamily: {
				Title: ["Title"],
				Roboto: ["Roboto"],
			},
			screens: {
				sm: { min: "390px" },
			},
			animation: {
				"slide-in": "slide 1s ease",
			},
			keyframes: {
				slide: {
					from: { transform: "translateX(0%)" },
					to: { transform: "translateX(-100%)" },
				},
			},
			spacing: {
				"calc-50%-1.469rem": "calc(50% - 1.469rem)",
			},
		},
	},
	plugins: [],
};
