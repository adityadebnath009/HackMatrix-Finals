import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#111916",
        surface: {
          DEFAULT: "#111916",
          lowest: "#0c1210",
          low: "#17211d",
          base: "#23312b",
          high: "#304139",
          highest: "#46584e",
        },
        primary: {
          DEFAULT: "#86a593",
          glow: "#b8d1c0",
          dark: "#405b4d",
        },
        secondary: {
          DEFAULT: "#b69a72",
          bright: "#dbc49f",
        },
        error: {
          DEFAULT: "#b55d4c",
          dim: "#61312a",
          bright: "#e2a397",
        },
        outline: {
          DEFAULT: "#6f8176",
          variant: "#3e4e45",
        },
        on: {
          surface: "#edf0e9",
          variant: "#b6c0b9",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
