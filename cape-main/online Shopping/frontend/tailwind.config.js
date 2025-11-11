/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Amazon Theme Colors
        amazon: {
          orange: '#FF9900',
          'dark-blue': '#232F3E',
          'light-blue': '#37475A',
          'bg-gray': '#EAEDED',
          'hover-orange': '#FFA724',
          'text-dark': '#0F1111',
          'text-medium': '#565959',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "#0F1111",
        primary: {
          DEFAULT: "#FF9900",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#232F3E",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#F3F3F3",
          foreground: "#565959",
        },
        accent: {
          DEFAULT: "#FF9900",
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "#0F1111",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "#0F1111",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
