/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', /* primary green at low opacity */
        input: 'var(--color-input)', /* pure white */
        ring: 'var(--color-ring)', /* forest green */
        background: 'var(--color-background)', /* soft mint white */
        foreground: 'var(--color-foreground)', /* deep forest green */
        primary: {
          DEFAULT: 'var(--color-primary)', /* forest green */
          foreground: 'var(--color-primary-foreground)', /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* ocean blue */
          foreground: 'var(--color-secondary-foreground)', /* white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* soft coral red */
          foreground: 'var(--color-destructive-foreground)', /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* soft mint white */
          foreground: 'var(--color-muted-foreground)', /* neutral gray */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* warm orange */
          foreground: 'var(--color-accent-foreground)', /* white */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* pure white */
          foreground: 'var(--color-popover-foreground)', /* deep forest green */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* pure white */
          foreground: 'var(--color-card-foreground)', /* deep forest green */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* bright green */
          foreground: 'var(--color-success-foreground)', /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* golden yellow */
          foreground: 'var(--color-warning-foreground)', /* deep forest green */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* soft coral red */
          foreground: 'var(--color-error-foreground)', /* white */
        },
      },
      fontFamily: {
        'heading': ['Fredoka One', 'cursive'],
        'body': ['Open Sans', 'sans-serif'],
        'caption': ['Nunito', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '6px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(45, 125, 50, 0.15)',
        'medium': '0 4px 12px rgba(45, 125, 50, 0.15)',
        'large': '0 8px 24px rgba(45, 125, 50, 0.15)',
      },
      animation: {
        'scale-celebration': 'scaleCelebration 0.3s ease-out',
        'height-expand': 'heightExpand 0.3s ease-out',
        'gentle-bounce': 'gentleBounce 0.2s ease-out',
      },
      keyframes: {
        scaleCelebration: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        heightExpand: {
          '0%': { height: '0' },
          '100%': { height: 'auto' },
        },
        gentleBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}