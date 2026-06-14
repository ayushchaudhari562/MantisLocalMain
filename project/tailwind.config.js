/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Premium sans-serif font stack
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      // Platform color palette
      colors: {
        bg: '#F3F5F7',
        surface: '#FFFFFF',
        primary: '#111315',
        muted: '#60758A',
        accent: '#4B5C6B',
      },
      // Soft shadow variants
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(17, 19, 21, 0.05)',
        'soft-sm': '0 2px 10px -1px rgba(17, 19, 21, 0.03)',
        'soft-lg': '0 8px 30px -4px rgba(17, 19, 21, 0.08)',
      },
      // Generous border radii
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}