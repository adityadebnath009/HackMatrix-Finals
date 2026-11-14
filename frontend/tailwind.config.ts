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
        background: "#051424",
        surface: {
          DEFAULT: "#051424",
          lowest: "#010f1f",
          low: "#0d1c2d",
          base: "#122131",
          high: "#1c2b3c",
          highest: "#273647",
        },
        primary: {
          DEFAULT: "#10b981",
          glow: "#4edea3",
          dark: "#00422b",
        },
        secondary: {
          DEFAULT: "#06b6d4",
          bright: "#4cd7f6",
        },
        error: {
          DEFAULT: "#ef4444",
          dim: "#93000a",
          bright: "#ffb4ab",
        },
        outline: {
          DEFAULT: "#86948a",
          variant: "#3c4a42",
        },
        on: {
          surface: "#d4e4fa",
          variant: "#94a3b8",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
