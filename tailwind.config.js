/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/public/hero.webp')",
      },
      colors: {
        navBar: {
          DEFAULT: "#242936",
        },
        fileFinder: {
          DEFAULT: "#1f2430",
        },
        main: {
          DEFAULT: "#242936",
        },
        superLightGray: {
          DEFAULT: "#80808040",
        },
        ayu: {
          yellow: "#e6b450",
          purple: "#c650e6",
          green: "#d5ff80",
          blue: "#95e6cb",
        },
      },
      borderWidth: {
        1: "1px",
      },
      minWidth: {
        12: "3rem",
      },
      fontSize: {
        md: ["0.9375rem", "22px"],
      },
      animation: {
        blink: "blink 1s step-start infinite",
        "fade-in": "fadeIn 0.2s ease-out",
        "purple-pulse": "purplePulse 12s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "50%": { opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        purplePulse: {
          "0%, 100%": { opacity: "0" },
          "12%, 33%": { opacity: "1" },
          "45%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
