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
        'noto-sans': ['Noto Sans'],
      }
    },
  },
  
  plugins: [require('tailwindcss-motion')],
}

