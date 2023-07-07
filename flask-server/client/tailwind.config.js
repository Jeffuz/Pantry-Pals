/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")

const Myclass = plugin(function ({ addUtilities }) {
  addUtilities({
    ".my-rotate-y-180": {
      transform:"rotateY(360deg)"
    },
  });
});
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./src/components/login/*.{js, jsx}",
  ],
  theme: {
    extend: {   },
  },
  plugins: [Myclass],
}

