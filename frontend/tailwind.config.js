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
        'indie-flower': ['Indie Flower'],
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': { content: 'none' }, 
            'code::after': { content: 'none' },  
          },
        },
      },
    },
  },
  
  plugins: [
    require('tailwindcss-motion'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('@tailwindcss/typography')
  ]
}

