/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#181820', // Add your custom color here
      },
      boxShadow: {
        'custom-top': '0 -4px 8px -2px rgba(0, 0, 0, 0.5)', // Example shadow for top effect
      },
    },
  },
  plugins: [],
}
