import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    screens: {
      lg: { max: "1500px" },
      md: { max: "1200px" },
      tb: { max: "800px" },
      sm: { max: "740px" },
      xs: { max: "572px" },
    },
    extend: {
      colors: {
        bg: {
          "light-grey": "var(--bg-light-grey)",
          white: "var(--white)",
        },
        white: {
          DEFAULT: "var(--white)",
          "2": "var(--white-2)",
          "3": "var(--white-3)"
        },
        black: {
          DEFAULT: "var(--black)",
          "2": "var(--black-2)"
        },
        grey: {
          DEFAULT: "var(--grey-1)",
          dark: "var(--grey-2)",
          light: "var(--grey-3)",
        },
        purple: {
          DEFAULT: "var(--main-purple)",
          main: "var(--main-purple)",
          light: "var(--purple-2)",
          "2":  "var(--purple-2)"
        },
        transparent: {
          DEFAULT: "transparent",
          black: "rgba(0, 0, 0, 0.50)",
          white: "rgba(255, 255, 255, 0.50)",
          white2: "rgba(255, 255, 255, 0.70)",
        },
      },
      fontFamily: {
        mulish: "var(--font-mulish)",
        bounded: "var(--font-bounded)",
        manrope: "var(--font-manrope)",
      },
    },
  },
  plugins: [],
} satisfies Config;
