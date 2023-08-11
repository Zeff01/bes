/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./<custom directory>/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#009598",
        secondary: "#348f90",
        tertiary: "#afebe1",
        quaternary: "#5d97af",
        quinary: "#fffcca",
        senary: "#efcc7f",
      },
      fontFamily: {
        titles: ["Kanit", "sans-serif"],
        subTitles: ["Futura PT", "sans-serif"],
      },
      fontSize: {
        25: "25px",
        18: "18px",
        10: "10px",
      },
      fontWeight: {
        bold: "bold",
        demi: "600",
        medium: "500",
      },
    },
  },
  plugins: [],
};
