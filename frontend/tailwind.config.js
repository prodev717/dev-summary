/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '390px',
      'md': '660px',
      'lg': '1080px',
    },
    extend: {
      fontFamily: {
        'poppins': ['Poppins'],
      }
    },
  },
  
  // eslint-disable-next-line no-undef
  plugins: [require('tailwindcss-motion')],
}

