const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.5rem",
      },
      gridTemplateRows: {
        "1fr-auto": "1fr auto",
      },
      listStyleImage: {
        star: 'url("/bullet-star.png")',
      },
      colors: {
        astro: {
          50: "#eceff2",
          100: "#d6dbe1",
          200: "#b2bbc7",
          300: "#8796a9",
          400: "#697b8e",
          500: "#546375",
          600: "#445060",
          700: "#3b4451",
          800: "#23262D",
          900: "#191c21",
          accent: {
            red: "#D83333",
            purple: "#6F54DB",
            pink: "#fe45ff",
            "dark-pink": "#F340C6",
          },
        },
      },
      fontFamily: {
        sans: ["Sora Variable", "Inter", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "2xs": "clamp(0.69rem, calc(0.81rem + -0.16vw), 0.78rem)",
        xs: "clamp(0.94rem, calc(0.93rem + 0.06vw), 0.97rem)",
        sm: "clamp(1.01rem, calc(.97rem + 0.43vw), 1.28rem)",
        md: "clamp(1.35rem, calc(1.14rem + 1.03vw), 1.94rem)",
        lg: "clamp(1.62rem, calc(1.23rem + 1.96vw), 2.35rem)",
        "3xl": "clamp(1.94rem, calc(1.27rem + 3.38vw), 3.89rem)",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".text-dropshadow": {
          "text-shadow": "0px .09em 4px #191C21",
        },
        ".text-balance": {
          "text-wrap": "balance",
        },
        ".shift-up": {
          transform: "translateY(5px)",
          transition: "800ms ease-in-out 50ms",
        },
        ".shift-left": {
          transform: "translateX(30px)",
          transition: "800ms ease-in-out 50ms",
        },
        ".shift-right": {
          transform: "translateX(-30px)",
          transition: "800ms ease-in-out 50ms",
        },
        ".fade-in": {
          transition: "800ms ease-in-out 50ms",
          opacity: "0",
        },
        ".shift-up.active": {
          transform: "translateY(0)",
        },
        ".shift-left.active": {
          transform: "translateX(0px)",
        },
        ".shift-right.active": {
          transform: "translateX(0px)",
        },
        ".fade-in.active": {
          opacity: "1",
        },
      });
    }),
  ],
};
