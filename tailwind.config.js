/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lumina: {
          bg: '#0A0A0A',
          surface: '#171717',
          text: '#F5F5F5',
          muted: '#A3A3A3',
          accent: '#D4AF37',
          contrast: '#FAFAFA',
          'contrast-text': '#171717',
        }
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
