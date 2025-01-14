/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '360px',
      'md': '640px',
      'lg': '1024px',
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

