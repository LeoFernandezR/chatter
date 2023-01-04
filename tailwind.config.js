/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "baby-blue": {
          100: "#e2f5fd",
          200: "#c4ecfb",
          300: "#a7e2fa",
          400: "#89d9f8",
          500: "#6ccff6",
          600: "#56a6c5",
          700: "#417c94",
          800: "#2b5362",
          900: "#162931",
        },
        jet: {
          100: "#d6d6d6",
          200: "#adadad",
          300: "#858585",
          400: "#5c5c5c",
          500: "#333333",
          600: "#292929",
          700: "#1f1f1f",
          800: "#141414",
          900: "#0a0a0a",
        },
        "baby-powder": {
          100: "#fffffe",
          200: "#fffffe",
          300: "#fffffd",
          400: "#fffffd",
          500: "#fffffc",
          600: "#ccccca",
          700: "#999997",
          800: "#666665",
          900: "#333332",
        },
        "orchid-crayola": {
          100: "#ffecf8",
          200: "#ffd9f1",
          300: "#fec6ea",
          400: "#feb3e3",
          500: "#fea0dc",
          600: "#cb80b0",
          700: "#986084",
          800: "#664058",
          900: "#33202c",
        },
        "yellow-green": {
          100: "#eaf5cc",
          200: "#d6eb99",
          300: "#c1e266",
          400: "#add833",
          500: "#98ce00",
          600: "#7aa500",
          700: "#5b7c00",
          800: "#3d5200",
          900: "#1e2900",
        },
      },
    },
  },
  plugins: [],
};
