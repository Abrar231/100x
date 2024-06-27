/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "twitter-blue": "#1d9bf0",
        "twitter-blue-hover": "#1871ca",
        "twitter-blue-disabled": "#1e5d87",
        "blue-wash": "rgba(117,190,239,0.2)",
        "button-stroke": "#546a7a",
        "stroke": "rgba(29,155,240,0.24)",
        "searchbar-fill": "#212327",
        "card-fill": "#16181c",
        "success": "#00be74",
        "error": "#8b141a",
        "heart-hover": "#f4245e",
        "modal": "#242d34",
        "neutral": {
          50: "#f9f9f9",
          100: "#f4f4f4",
          200: "#e4e4e4",
          300: "#d3d3d3",
          400: "#a2a2a2",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
          1000: "#000000",
        },
      },
      spacing: {
        "1.2": "5px",
        "3.5": "14px",
        "354": "354px",
        "390": "390px",
        "824": "824px",
        "868": "868px",
      },
      fontFamily: {
        'inter': ["Inter"],
      },
    },
  },
  plugins: [],
}

