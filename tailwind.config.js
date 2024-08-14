/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: '#574476', 
        lightBlue: '#1DC9B7'
      },
      backgroundImage: {
        'custom-bg': "url('./assets/p1.png')",
        'custom-bg1': "url('./assets/p2.jpg')", // Custom background image
      },
    },
  },
  plugins: [],
}
