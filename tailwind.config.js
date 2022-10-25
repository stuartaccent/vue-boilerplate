/* eslint-env node */
/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  safelist: [
    "formkit-outer",
    "formkit-inner",
    "formkit-help",
    "formkit-messages",
    "formkit-message",
  ],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: colors.slate[300],
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
