/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#060b14',
          100: '#0d1520',
          200: '#111d2e',
          300: '#182841',
          400: '#1f3355',
        },
        gold: {
          DEFAULT: '#d4a017',
          light: '#f5c542',
          dark: '#a67c00',
          muted: 'rgba(212,160,23,0.15)',
        },
        fire: {
          DEFAULT: '#e8650a',
          light: '#ff8534',
          dark: '#b84d00',
        },
        shield: {
          DEFAULT: '#0f2847',
          light: '#1e3a6f',
          dark: '#091a30',
        },
        cream: '#f5f0e8',
        ash: '#7a8599',
        emerald: '#22c55e',
        crimson: '#ef4444',
      },
      fontFamily: {
        display: ['"Rajdhani"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        accent: ['"Bebas Neue"', 'sans-serif'],
      },
      backgroundImage: {
        'stadium-glow': 'radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.12) 0%, transparent 60%)',
        'gold-gradient': 'linear-gradient(135deg, #d4a017, #f5c542, #d4a017)',
        'fire-gradient': 'linear-gradient(135deg, #e8650a, #d4a017)',
        'shield-gradient': 'linear-gradient(180deg, #0f2847, #060b14)',
        'card-gradient': 'linear-gradient(145deg, rgba(13,21,32,0.9), rgba(17,29,46,0.7))',
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(212,160,23,0.1) 50%, transparent 100%)',
      },
      boxShadow: {
        'gold-sm': '0 2px 12px rgba(212,160,23,0.15)',
        'gold-md': '0 4px 24px rgba(212,160,23,0.2)',
        'gold-lg': '0 8px 40px rgba(212,160,23,0.3)',
        'fire-sm': '0 2px 12px rgba(232,101,10,0.15)',
        'inner-gold': 'inset 0 1px 0 rgba(212,160,23,0.2)',
        'card': '0 4px 30px rgba(0,0,0,0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-slow': 'fadeIn 1.2s ease-out forwards',
        'scale-in': 'scaleIn 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'slide-left': 'slideLeft 0.8s ease-out forwards',
        'slide-right': 'slideRight 0.8s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'x-appear': 'xAppear 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(-60px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(60px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212,160,23,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(212,160,23,0.5)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        xAppear: {
          '0%': { transform: 'scale(0) rotate(-180deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
}
