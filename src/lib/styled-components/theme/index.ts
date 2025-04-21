import { css, DefaultTheme } from 'styled-components';

// ❶ Raw numbers (easier to reuse elsewhere)
export const breakpoints = {

    md: 1200,
    sm: 764
} as const;

// ❷ A typed helper such that: theme.bp.up('md') / down('sm')
type Bp = keyof typeof breakpoints;

function up(bp: Bp) {
  return (first: any, ...rest: any[]) => css`
    @media (min-width: ${breakpoints[bp]}px) {
      ${css(first, ...rest)}
    }
  `;
}

function down(bp: Bp) {
  return (first: any, ...rest: any[]) => css`
    @media (max-width: ${breakpoints[bp] - 0.02}px) {
      ${css(first, ...rest)}
    }
  `;
}

// ❸ Your design‑tokens go here
export const theme = {
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
  bp: { up, down },
};
