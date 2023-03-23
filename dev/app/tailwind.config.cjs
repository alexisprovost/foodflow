/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '300px',
      'md': '600px',
      'lg': {'min': '800px', 'max': '1279px'},
      'xl': '1280px',
    },
    extend: {
      colors: {
        primary: "#263238",
        secondary: "#2c4048",
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
