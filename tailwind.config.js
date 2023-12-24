/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      ... require('tailwindcss/colors'),
      primary: '#000000',
      secondary: '#D743FB',
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}