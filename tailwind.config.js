/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: "#F2EEE5",
        ink: "#1E2126",
        navy: {
          50: "#EAECF1",
          100: "#CBD1DE",
          400: "#3D4C71",
          600: "#28365A",
          700: "#1F2A44",
          800: "#182036",
          900: "#111726",
        },
        sage: {
          400: "#93A987",
          500: "#7C9473",
          600: "#647A5C",
        },
        gold: {
          400: "#D6B571",
          500: "#C9A15A",
        },
      },
      fontFamily: {
        display: ["Instrument Serif", "serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(30,33,38,0.05), 0 16px 36px -16px rgba(30,33,38,0.2)",
      },
    },
  },
  plugins: [],
}
