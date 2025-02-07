/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['Fredoka', 'Arial', 'Helvetica', 'sans-serif'],
        barriecito: ['Barriecito', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: ['lofi'],
  },
  plugins: [require('daisyui')],
}
