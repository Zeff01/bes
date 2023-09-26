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
        primaryColor: "#2B6673",
        secondaryColor: "#87B0B6",
        tertiaryColor: "#E0F5FA",
        quarternaryColor: "#AAEDFC",
        quinaryColor: "#EFF1F2",
        senaryColor: "#DBE1FC",
        whiteColor: "#F5F5FA",
        blackColor: "#13131A",
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
