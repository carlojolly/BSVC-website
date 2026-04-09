/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        border: "var(--border)",
      },
      fontFamily: {
        mono: "var(--font-geist-mono)",
        sentient: ["'Sentient'", "sans-serif"],
        "libre-franklin": "var(--font-libre-franklin)",
        inter: "var(--font-inter)",
      },
      boxShadow: {
        glow: "0 0 8px 2px var(--tw-shadow-color)",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          md: "2rem",
          xl: "3rem",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
