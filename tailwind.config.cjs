/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        main: {
          DEFAULT: "hsl(var(--main))",
          foreground: "hsl(var(--main-foreground))",
        },
        sheet: {
          DEFAULT: "hsl(var(--sheet))",
          foreground: "hsl(var(--sheet-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      container: {
        padding: "16px",
        center: true,
      },
      animation: {
        "carousal-fade": "carousal-fade 0.5s ease-in-out",
        "carousal-slide": "carousal-slide 0.5s ease-in-out",
        "carousal-zoom": "carousal-zoom 0.5s ease-in-out",
        "carousal-fade-slide": "carousal-fade-slide 0.5s ease-in-out",
        "carousal-zoom-slide": "carousal-zoom-slide 0.5s ease-in-out",
      },
      keyframes: {
        "carousal-fade": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "carousal-slide": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "carousal-zoom": {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        "carousal-fade-slide": {
          "0%": { opacity: "0", transform: "translateX(-100%)" },
          "50%": { opacity: "0.5", transform: "translateX(-50%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "carousal-zoom-slide": {
          "0%": { transform: "scale(0.5) translateX(-100%)" },
          "50%": { transform: "scale(0.75) translateX(-50%)" },
          "100%": { transform: "scale(1) translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
