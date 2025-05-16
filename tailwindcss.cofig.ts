/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        light: {
          primary: "var(--color-light-primary)",
          accent: "var(--color-light-accent)",
          surface: "var(--color-light-surface)",
          background: "var(--color-light-background)",
          text: "var(--color-light-text)",
        },
        dark: {
          primary: "var(--color-dark-primary)",
          accent: "var(--color-dark-accent)",
          surface: "var(--color-dark-surface)",
          background: "var(--color-dark-background)",
          text: "var(--color-dark-text)",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        cairo: ["var(--font-cairo)"],
      },
    },
  },
  plugins: [],
};
