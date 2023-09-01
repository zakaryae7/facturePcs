/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#003170",
        secondary: "#279EFF",
      },
      gridTemplateColumns: {
        'azz': 'repeat(auto-fit, minmax(300px, 1fr))',
      }
    },
  },
  plugins: [],
}

