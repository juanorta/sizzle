import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        cream: "#F8F5EE",
        creamDeep: "#EFEAE0",
        ember: "#C2410C",
        gold: "#B8862F",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 0 rgba(10,10,10,0.04), 0 12px 32px -16px rgba(10,10,10,0.18)",
      },
      keyframes: {
        fillCell: {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "60%": { transform: "scale(1.1)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(194,65,12,0)" },
          "50%": { boxShadow: "0 0 40px 8px rgba(194,65,12,0.35)" },
        },
        rise: {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        fillCell: "fillCell 420ms cubic-bezier(0.22, 1, 0.36, 1)",
        glow: "glow 1.2s ease-out 1",
        rise: "rise 380ms cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
