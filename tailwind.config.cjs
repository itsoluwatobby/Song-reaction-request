/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      midscreen: {'max': '908px'},
      maxscreen: {'min': '768px'}
    }
  },
  plugins: [],
}