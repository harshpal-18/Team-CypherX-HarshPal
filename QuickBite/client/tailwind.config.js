/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        accent: {
          50:  '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        success: '#22c55e',
        warning: '#f59e0b',
        danger:  '#ef4444',
        surface: {
          light: '#ffffff',
          dark:  '#0f0f0f',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'card':    '0 2px 16px 0 rgba(249,115,22,0.10)',
        'card-lg': '0 8px 40px 0 rgba(249,115,22,0.18)',
        'glow':    '0 0 24px 4px rgba(249,115,22,0.25)',
      },
      animation: {
        'ticker':       'ticker 30s linear infinite',
        'fade-in':      'fadeIn 0.4s ease-out',
        'slide-up':     'slideUp 0.4s ease-out',
        'slide-in':     'slideIn 0.3s ease-out',
        'bounce-slow':  'bounce 2s infinite',
        'pulse-slow':   'pulse 3s infinite',
        'spin-slow':    'spin 3s linear infinite',
        'float':        'float 3s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to:   { transform: 'translateY(0)',    opacity: '1' },
        },
        slideIn: {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to:   { transform: 'translateX(0)',    opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'hero-gradient':   'linear-gradient(135deg, #fff7ed 0%, #ffe4e6 50%, #fff7ed 100%)',
        'orange-gradient': 'linear-gradient(135deg, #f97316 0%, #e11d48 100%)',
        'dark-gradient':   'linear-gradient(135deg, #1c1c1c 0%, #2d1b0e 100%)',
      },
    },
  },
  plugins: [
    // @tailwindcss/forms removed for now, using custom form styles
  ],
}
