const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  plugins: [require("daisyui"), require("tw-elements/dist/plugin.cjs")],
  darkMode: "class",
  theme: {
    colors: {
      azul: "#04accc",
      secondary: "#7ce8fc ",
      primary_color: "#388A5A ",
      darkverde: "#026d82 ",
      verde: "#027e96 ",
      white: "#fff",
      ...colors
    },
    extend: {
      rotate: {
        360: "360deg",
      },
      keyframes: {
        float: {
          "0%": { transform: "translatey(0px)" },
          "50%": { transform: "translatey(-10px)" },
          "100%": { transform: "translatey(0px)" },
        },
      },
      animation: {
        float: "float 4s linear infinite",
      },
    },
  },
};
