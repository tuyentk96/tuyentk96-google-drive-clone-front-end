/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      notoSans: ["'Google Sans'", "Roboto", "'Noto Sans Myanmar UI'", "Arial", "sans-serif"],
    },
    screens: {
      xs: "415px",
      sm: "600px",
      md: "840px",
      lg: "960px",
      xl: "1240px",
    },
    extend: {},
  },
  plugins: [],
}