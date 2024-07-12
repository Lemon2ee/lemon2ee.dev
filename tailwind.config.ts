import type { Config } from "tailwindcss";
const colors = require('tailwindcss/colors');

delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./_posts/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      ...colors,
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      beige: "#f5f5dc",
      draculaBg: "#282a36",
      amber50: "#fffbeb",
      tahiti: {
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#164e63",
      },
    },
    extend: {
      // fontFamily: {
      //   sans: ["var(--font-geist-sans)"],
      //   mono: ["var(--font-geist-mono)"],
      // },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: ({ theme }: any) => ({
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
        custom: {
          css: {
            "blockquote p:first-of-type::before": { content: 'none' },
            "blockquote p:first-of-type::after": { content: 'none' },
            "--tw-prose-body": theme("colors.neutral[800]"),
            "--tw-prose-headings": theme("colors.neutral[900]"),
            "--tw-prose-lead": theme("colors.neutral[700]"),
            "--tw-prose-links": theme("colors.neutral[900]"),
            "--tw-prose-bold": theme("colors.neutral[900]"),
            "--tw-prose-counters": theme("colors.neutral[600]"),
            "--tw-prose-bullets": theme("colors.neutral[700]"),
            "--tw-prose-hr": theme("colors.neutral[300]"),
            "--tw-prose-quotes": theme("colors.neutral[900]"),
            "--tw-prose-quote-borders": theme("colors.neutral[300]"),
            "--tw-prose-captions": theme("colors.neutral[700]"),
            "--tw-prose-code": theme("colors.neutral[900]"),
            "--tw-prose-pre-code": theme("colors.black"),
            "--tw-prose-pre-bg": theme("colors.transparent"),
            "--tw-prose-th-borders": theme("colors.neutral[300]"),
            "--tw-prose-td-borders": theme("colors.neutral[200]"),
            "--tw-prose-invert-body": theme("colors.neutral[200]"),
            "--tw-prose-invert-headings": theme("colors.white"),
            "--tw-prose-invert-lead": theme("colors.neutral[300]"),
            "--tw-prose-invert-links": theme("colors.white"),
            "--tw-prose-invert-bold": theme("colors.white"),
            "--tw-prose-invert-counters": theme("colors.neutral[400]"),
            "--tw-prose-invert-bullets": theme("colors.white"),
            "--tw-prose-invert-hr": theme("colors.neutral[700]"),
            "--tw-prose-invert-quotes": theme("colors.neutral[100]"),
            "--tw-prose-invert-quote-borders": theme("colors.neutral[700]"),
            "--tw-prose-invert-captions": theme("colors.neutral[400]"),
            "--tw-prose-invert-code": theme("colors.white"),
            "--tw-prose-invert-pre-code": theme("colors.neutral[300]"),
            "--tw-prose-invert-pre-bg": theme("colors.transparent"),
            "--tw-prose-invert-th-borders": theme("colors.neutral[600]"),
            "--tw-prose-invert-td-borders": theme("colors.neutral[700]"),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
