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
          middle: "var(--grey-4)"
        },
        brown: {
          DEFAULT: "var(--brown-1)"
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
  plugins: [
    function({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        '.scrollbar-hide': {
          /* Hide scrollbar for Chrome, Safari and Opera */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.scrollbar-thin': {
          /* Thin scrollbar for Chrome, Safari and Opera */
          '&::-webkit-scrollbar': {
            width: '4px',
            height: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '2px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(0, 0, 0, 0.4)',
          },
        },
      })
    }
  ],
} satisfies Config;
