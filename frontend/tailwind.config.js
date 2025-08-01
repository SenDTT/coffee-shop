/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // important for Next.js app dir
    "./pages/**/*.{js,ts,jsx,tsx}", // if you also use pages dir
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["bg-forest"],
  theme: {
    extend: {
      colors: {
        mocha: {
          50: "#fdf9f5",
          100: "#f6eee7",
          200: "#e8d5c6",
          300: "#d9bba5",
          400: "#cba284",
          500: "#bc8963",
          600: "#a06f4f",
          700: "#83563f",
          800: "#66402f",
          900: "#4b3832",
        },
        latte: {
          50: "#fffaf2",
          100: "#fff4e6",
          200: "#ffe8cc",
          300: "#ffd5a6",
          400: "#e0b894",
          500: "#c19a6b",
          600: "#a17b55",
          700: "#815c40",
          800: "#5f3e2b",
          900: "#3e2723",
        },
        caramel: {
          50: "#fffaf3",
          100: "#fef1e2",
          200: "#fcdcc0",
          300: "#fbc29c",
          400: "#f9a978",
          500: "#e18f5c",
          600: "#c37645",
          700: "#a55e32",
          800: "#87471f",
          900: "#6b4f4f",
        },
        cabin: {
          50: "#fdf9f6",
          100: "#f6ebe4",
          200: "#e7d2c3",
          300: "#d9b9a2",
          400: "#caa082",
          500: "#bc8761",
          600: "#a36e50",
          700: "#8a5640",
          800: "#71412f",
          900: "#3b2f2f",
        },
        espresso: {
          50: "#fff9f2",
          100: "#fcefdc",
          200: "#f8debb",
          300: "#f4c991",
          400: "#e9a86c",
          500: "#d88a52",
          600: "#b96f42",
          700: "#955634",
          800: "#703e27",
          900: "#5c4033",
        },
        chocolate: {
          50: "#fdf9f5",
          100: "#f6eee7",
          200: "#e8d5c6",
          300: "#d9bba5",
          400: "#cba284",
          500: "#bc8963",
          600: "#a06f4f",
          700: "#83563f",
          800: "#66402f",
          900: "#4b3832",
        },
        hazelnut: {
          50: "#fdf9f5",
          100: "#f6eee7",
          200: "#e8d5c6",
          300: "#d9bba5",
          400: "#cba284",
          500: "#bc8963",
          600: "#a06f4f",
          700: "#83563f",
          800: "#66402f",
          900: "#4b3832",
        },
        coffee: "#d66e39",
        almond: "#f6f0e8",
        vanilla: "#fdf6e3",
        light_latte: "#fcf5ea",
        sage: "#a3b18a",
        ivory: "#f6f5f0",
        rosewood: "#65000b",
        warmgray: "#cfc9c2",
        dustypink: "#e6b8b7",
        bronze: "#cd7f32",
        terracotta: "#e07a5f",
        cream: "#fff4e6",
        dust: "#adb5bd",
        forest: "#4f6f52",
        palegold: "#d4af37",
        teal: "#6b9080",
        copper: "#b87333",
        blush: "#f4d9c6",
        burnt: "#cc5500",

        "coastal-light": {
          bg: "#E6F5FA",
          text: "#234E52",
          logo: "#2C7A7B",
          accent: "#F55655",
          border: "#BEE7F8",
          "toggle-bg": "#CFE7F2",
          "toggle-indicator": "#FDF5C2",
        },
        "coastal-dark": {
          bg: "#003C41",
          text: "#E6FFFA",
          logo: "#4FD1C5",
          accent: "#FC8181",
          border: "#4A6A6D",
          "toggle-bg": "#0F2B2F",
          "toggle-indicator": "#FDF5C2",
        },
        "coastal-additional": {
          info: "#38B2AC",
          warning: "#F6AD55",
          success: "#68D391",
          error: "#E53E3E",
          "hover-accent-light": "#FF7F7F",
          "hover-accent-dark": "#E57373",
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        bounce: "bounce 1s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        pop: "pop 1s ease-in-out",
        fadeInUp: "fadeInUp 1s ease forwards",
        shake: "shake 0.6s ease-in-out",
        steamRise: "steamRise 1s ease-in-out infinite",
        heartbeat: "heartbeat 1s ease-in-out infinite",
        pulseGlow: "pulseGlow 1s ease-in-out infinite",
        rotateSlow: "rotateSlow 5s linear infinite",
        rotateFast: "rotateFast 1s linear infinite",
        rotate: "rotate 1s linear infinite",
        slideInLeft: "slideInLeft 0.5s ease forwards",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        shake: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-4px)" },
          "50%": { transform: "translateX(4px)" },
          "75%": { transform: "translateX(-4px)" },
          "100%": { transform: "translateX(0)" },
        },
        steamRise: {
          "0%": { transform: "translateY(0) scale(1)", opacity: 0.6 },
          "50%": { transform: "translateY(-10px) scale(1.05)", opacity: 0.3 },
          "100%": { transform: "translateY(-20px) scale(1.1)", opacity: 0 },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "25%": { transform: "scale(1.1)" },
          "50%": { transform: "scale(0.95)" },
          "75%": { transform: "scale(1.05)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0px rgba(255, 160, 122, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(255, 160, 122, 0.8)" },
        },
        rotateSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        rotateFast: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        slideInLeft: {
          "0%": { opacity: 0, transform: "translateX(-30px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
  ],
};
