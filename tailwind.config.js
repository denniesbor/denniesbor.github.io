/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "computer-modern": ["Computer Modern", "serif"],
      },
      maxWidth: {
        "8xl": "160rem", // default 7xl
      },
    },
  },
  plugins: [],
};
