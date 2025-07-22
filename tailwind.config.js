/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2',
        secondary: '#67C587',
        success: '#34D399',
        warning: '#FBBF24',
        error: '#EF4444',
        info: '#60A5FA'
      },
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        DEFAULT: '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        'full': '9999px',
        'button': '8px'
      },
      fontFamily: {
        'pacifico': ['Pacifico', 'cursive'],
        'inter': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
} 