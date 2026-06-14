/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F3F5F7',
        white: '#FFFFFF',
        primary: '#111315',
        muted: '#60758A',
      },
      boxShadow: {
        // Subtle soft shadow instead of heavy default shadow
        'soft': '0 4px 20px -2px rgba(17, 19, 21, 0.05)',
        'soft-sm': '0 2px 10px -1px rgba(17, 19, 21, 0.03)',
      }
    },
  },
  plugins: [],
}