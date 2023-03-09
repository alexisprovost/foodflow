/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#263238",
        secondary: "#314549",
        navBg: "#1e272c",
        primaryText: "#ffffff",
        secondaryText: "#949494",
        primaryButton: "#26373a",
        secondaryButton: "#3e747b",
        danger: "#ff6969",
        success: "#8ce790",
        warning: "#f0ce7e"
      },
      fontFamily: {
        fugazone: ["Fugaz One", "sans-serif"],
      },
    },
  },
  plugins: [],
}
