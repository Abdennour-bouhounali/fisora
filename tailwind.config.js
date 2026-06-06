/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.{js,ts,jsx,tsx,blade.php}",
    "./resources/views/**/*.blade.php",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        nature: {
          green: {
            DEFAULT: '#00934A',
            dark: '#006228',
            light: '#00BB59',
            verydark: '#042110',
          },
          beige: {
            DEFAULT: '#F7F3EE',
            dark: '#EAE1D5',
            light: '#FFFFFF',
          },
          white: '#FFFFFF',
          lemon: '#00BB59',
          orange: '#00934A',
        }
      },
      fontFamily: {
        sans: ['Area', 'Inter', 'sans-serif'],
        arabic: ['Noto Sans Arabic', 'sans-serif'],
      },
      borderRadius: {
        'premium': '2rem',
        'premium-sm': '1rem',
      },
      boxShadow: {
        'premium': '0 10px 40px -10px rgba(74, 93, 35, 0.1)',
        'premium-hover': '0 20px 60px -15px rgba(74, 93, 35, 0.15)',
      }
    },
  },
  plugins: [],
}
