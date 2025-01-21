import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    screens: {
      lg: { max: "1510px" },
      md: { max: "1022px" },
      sm: { max: "724px" },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        main:  { purple: "#7A66D5", brown: '#3D322B'},
        light: { grey: "#CACACA", purple: "#6351B5"}
      },
      fontFamily: {
        mulish: "var(--font-mulish)"
      }
    },
  },
  plugins: [],
} satisfies Config;
