import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    screens: {
      lg: { max: "1210px" },
      md: { max: "1022px" },
      sm: { max: "724px" },
    },
    extend: {
      colors: {
        bg: {
          black: "#121212",
          "light-grey": "#F8F8F8",
          white: "#FFFFFF",
        },
        black: "#121212",
        grey: {
          DEFAULT: "#CACACA",
          dark: "#818181",
          light: "#EDEDED",
        },
        purple: {
          DEFAULT: "#7A66D5",
          light: "#B6A9F1",
        },
        transparent: {
          black: "rgba(0, 0, 0, 0.50)",
          white: "rgba(255, 255, 255, 0.50)",
          white2: "rgba(255, 255, 255, 0.70)"
        },
      },
      fontFamily: {
        mulish: "var(--font-mulish)",
      },
    },
  },
  plugins: [],
} satisfies Config;
