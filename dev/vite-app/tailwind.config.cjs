/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
	theme: {
		screens: {
			sm: "300px",
			md: "600px",
			lg: { min: "800px", max: "1279px" },
			xl: "1280px",
		},
		extend: {
			colors: {
				primary: "#121b26",
				secondary: "#1b2834",
				primaryText: "#ffffff",
				secondaryText: "#949494",
				primaryButton: "#14B8A6",
				secondaryButton: "#3e747b",
				danger: "#ff6969",
				success: "#8ce790",
				warning: "#f0ce7e",
			},
			fontFamily: {
				fugazone: ["Fugaz One", "sans-serif"],
			},
		},
	},
	plugins: [],
};
