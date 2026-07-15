/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: '#D3E4D7',
          light: '#E8F2EA',
          dark: '#A6C6AE',
        },
        teal: {
          DEFAULT: '#0D9488',
          light: '#14B8A6',
          dark: '#0F766E',
        },
        moss: {
          DEFAULT: '#2E4036',
          light: '#3E5447',
          dark: '#1F2C25',
          deep: '#141D18',
        },
        clay: {
          DEFAULT: '#CC5833',
          light: '#DE6B48',
          dark: '#B04725',
        },
        cream: {
          DEFAULT: '#F2F0E9',
          light: '#F8F7F4',
          dark: '#E2DEC6',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          light: '#2A2A2A',
          dark: '#0E0E0E',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Outfit"', 'sans-serif'],
        outfit: ['"Outfit"', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      transitionTimingFunction: {
        'magnetic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }
    },
  },
  plugins: [],
}
