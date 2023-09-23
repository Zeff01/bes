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
        primary: "#2B6673",
        secondary: "#87BOB6",
        tertiary: "#EOF5FA",
        quaternary: "#AAEDFC",
        quinary: "#EFF1F2",
        senary: "#DBE1FC",
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
      // boxShadow: {
      //   'shadow': 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
      // },
    },
  },
  plugins: [],
};
