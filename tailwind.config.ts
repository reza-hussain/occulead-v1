/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        borderColor: "#D5DBDC",
        themeBlue: "#438aff",
        themeSidebarBlue: "#080e1e",
        themeTextWhite: "#fafafa",
        themeTextDisabled: "#ebebeb",
        themeContainerWhite: "#f2f5fa"
      }
    }
  },
  plugins: []
};
