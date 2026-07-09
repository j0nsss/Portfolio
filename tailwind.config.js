/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // ─── Color Palette ───────────────────────────────────────────────
      colors: {
        neu: {
          base: '#e0e5ec',
          'shadow-dark': '#a3b1c6',
          'shadow-light': '#ffffff',
          'text-primary': '#2d3a4a',
          'text-secondary': '#56657d',
          accent: '#4f7cac',
          'accent-light': '#d0e4f7',
          'accent-dark': '#2e5c8a',
          success: '#4caf8a',
          error: '#e07070',
        },
      },

      // ─── Typography ───────────────────────────────────────────────────
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
      },

      // ─── Neumorphic Box Shadows ───────────────────────────────────────
      boxShadow: {
        'neu-raised':
          '6px 6px 14px #a3b1c6, -6px -6px 14px #ffffff',
        'neu-raised-lg':
          '10px 10px 20px #a3b1c6, -10px -10px 20px #ffffff',
        'neu-sunken':
          'inset 4px 4px 8px #a3b1c6, inset -4px -4px 8px #ffffff',
        'neu-pressed':
          'inset 6px 6px 12px #a3b1c6, inset -6px -6px 12px #ffffff',
        'neu-flat':
          '2px 2px 6px #a3b1c6, -2px -2px 6px #ffffff',
        'neu-accent':
          '6px 6px 14px #a3b1c6, -6px -6px 14px #ffffff, inset 0 0 0 1px rgba(79, 124, 172, 0.2)',
        'neu-hover':
          '8px 8px 18px #a3b1c6, -8px -8px 18px #ffffff',
      },

      // ─── Border Radius ────────────────────────────────────────────────
      borderRadius: {
        'neu': '16px',
        'neu-sm': '10px',
        'neu-lg': '24px',
        'neu-xl': '32px',
      },

      // ─── Spacing Additions ────────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },

      // ─── Transitions ─────────────────────────────────────────────────
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        'neu': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },

      // ─── Background Patterns ─────────────────────────────────────────
      backgroundImage: {
        'neu-gradient': 'linear-gradient(145deg, #e6ebf2, #d4d9e0)',
        'accent-gradient': 'linear-gradient(135deg, #4f7cac, #2e5c8a)',
      },
    },
  },
  safelist: [
    'shadow-neu-raised',
    'shadow-neu-sunken',
    'shadow-neu-hover',
    'shadow-neu-pressed',
    'shadow-neu-accent',
    'shadow-neu-flat',
    'shadow-neu-raised-lg',
  ],
  plugins: [],
};
