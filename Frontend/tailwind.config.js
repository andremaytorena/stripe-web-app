/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/index.css", 
    "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.625rem',
        'sx': '0.8125rem',
      },
    },
  },
  plugins: [],
}

