module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'leaf': '#16a34a', // green-600
        'leaf-light': '#22c55e', // green-500
        'leaf-dark': '#15803d', // green-700
        'soil': '#b45309', // amber-700
        'wheat': '#facc15', // yellow-400
        
        // Neutral Colors
        'white': '#ffffff', // white
        'off-white': '#f9fafb', // gray-50
        'light-gray': '#f3f4f6', // gray-100
        'medium-gray': '#d1d5db', // gray-300
        'dark-gray': '#4b5563', // gray-600
        'charcoal': '#1f2937', // gray-800
        
        // Semantic Colors
        'success': '#22c55e', // green-500
        'warning': '#f59e0b', // amber-500
        'error': '#ef4444', // red-500
        'info': '#3b82f6', // blue-500
        'sky': '#38bdf8', // sky-400
        'harvest': '#fb923c', // orange-400
      },
      fontFamily: {
        'heading': ['Montserrat', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'display': ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'elevation-1': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        'elevation-2': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        'elevation-3': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        'elevation-4': '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'pulse-custom': 'pulse 1.5s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, var(--color-leaf), var(--color-leaf-light))',
        'gradient-secondary': 'linear-gradient(to right, var(--color-soil), var(--color-wheat))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}