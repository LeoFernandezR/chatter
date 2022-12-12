/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#272643",
        "gray-blue": "#2F3B52",
        "light-cyan": "#e3f6f5",
        "light-teal": "#bae8e8",
        "petrol-blue": "#2c698d",
      },
    },
  },
  plugins: [],
};
