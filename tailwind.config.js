/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Exact logo color #058996
        primary: "#058996",
        primaryLight: "#e6f4f6",
        primaryLighter: "#f0f9fa",
        primaryDark: "#04717d",
        primaryDarker: "#035a64",
        accent: "#ff7a45",
        accentHover: "#ff6327",
        textDark: "#1a2a3a",
        textMuted: "#5a6c7d",
        softBg: "#f8fcfd",
      },
    },
  },
  plugins: [],
};