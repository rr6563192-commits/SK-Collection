/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          deep: '#050505',
          secondary: '#0B0B0B',
          card: '#111111',
          elevated: '#161616',
          cart: '#080808',
          input: '#0D0D0D',
        },
        border: {
          DEFAULT: '#292929',
          input: '#2A2A2A',
          card: '#242424',
        },
        gold: {
          DEFAULT: '#D4AF37',
          deep: '#C9A227',
          bright: '#F4D675',
          soft: '#E6C65C',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#B8B8B8',
          muted: '#777777',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'Manrope', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 0 24px rgba(212, 175, 55, 0.25)',
        goldSm: '0 0 12px rgba(212, 175, 55, 0.18)',
      },
      keyframes: {
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212,175,55,0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(212,175,55,0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        pulseGold: 'pulseGold 2.4s ease-in-out infinite',
        fadeUp: 'fadeUp 0.8s ease forwards',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
};
