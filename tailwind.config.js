/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': {
          'primary': '#171923',
          'secondary': '#1A202C',
          'accent': '#2D3748',
        },
        'light': {
          'primary': '#F0F4F8',
          'secondary': '#FFFFFF',
          'accent': '#E1E8EF',
        },
        'purple': {
          'primary': '#805AD5',
          'light': '#9F7AEA',
          'dark': '#6B46C1',
        },
        'blue': {
          'light': '#63B3ED',
          'lighter': '#EBF8FF',
          'dark': '#4299E1',
        },
        'text': {
          'primary': '#F7FAFC',
          'secondary': '#A0AEC0',
          'accent': '#CBD5E0',
        },
        'text-light': {
          'primary': '#2D3748',
          'secondary': '#4A5568',
          'accent': '#718096',
        },
      }
    },
  },
  plugins: [],
} 