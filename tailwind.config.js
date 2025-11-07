/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        geist: ["Geist", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        'primary-green': '#32cd87', 
        'dark-green': '#245f37',    
        'deep-green': '#037c46',    
        'dark-bg': '#141414',       
        'light-black': '#1e1e1e',   
        'medium-gray': '#a5a5a5',   
        'light-gray': 'rgba(255, 255, 255, 0.4)', 
        'off-white': '#ffffff',     
        'footer-gray': 'rgb(165, 165, 165)', 
        'off-white-framer': 'var(--token-b95183a0-b95183a0)',
        'light-black-framer': 'var(--token-ff4e9448-ff4e9448)',
        'medium-gray-framer': 'var(--token-9f836d20-9f836d20)',
        'dark-bg-framer': 'var(--token-b6b333e5-b6b333e5)',
        'deep-green-framer': 'var(--token-f6581acf-f6581acf)',
        'dark-green-framer': 'var(--token-b333e7ef-b333e7ef)',
        'primary-green-framer': 'var(--token-da5c3404-da5c3404)',
      },
    },
  },
  plugins: [],
};