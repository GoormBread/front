/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'groom-brown': '#E8DECF',
        'groom-grey': '#F5F0E5',
        'groom-browntext': '#A1824A',
        'groom-green': '#009963',
        'groom-blacktext': '#1C170D'
      },
      spacing: {
        '128': '32rem'
      }
    },
  },
  plugins: [],
}

