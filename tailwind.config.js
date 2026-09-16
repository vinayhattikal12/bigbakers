/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF9',
          100: '#FAF6F0',
          200: '#F5EFEB',
          300: '#EBDDCE',
          400: '#DECCA8',
          500: '#CBB285',
        },
        ivory: '#FFFDF9',
        caramel: {
          DEFAULT: '#C68B59',
          light: '#E2AB7E',
          dark: '#9E6437',
        },
        cocoa: {
          DEFAULT: '#2D1B16',
          deep: '#1B110E',
          soft: '#4A322C',
        },
        peach: {
          DEFAULT: '#FDE8DC',
          warm: '#F7C4A5',
        },
        berry: {
          pink: '#F7D1D8',
          crimson: '#9B1D20',
          rose: '#D64045',
        },
        pistachio: {
          light: '#E8F1E8',
          DEFAULT: '#C7DAC7',
          dark: '#6E8B6E',
        },
        butter: '#FEF3C7',
        gold: {
          light: '#F3E5AB',
          DEFAULT: '#D4AF37',
          dark: '#AA820A',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-cinzel)', 'Cinzel', 'Playfair Display', 'serif'],
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};