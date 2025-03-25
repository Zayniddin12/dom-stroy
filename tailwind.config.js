const plugin = require('tailwindcss/plugin')

const rotateX = plugin(function ({ addUtilities }) {
  addUtilities({
    '.-rotate-x-45': {
      transform: 'rotateX(-45deg)',
    },
    '.rotate-x-0': {
      transform: 'rotateX(0deg)',
    },
  })
})

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      lineHeight: {
        17: '17px',
        19: '19px',
        125: '125%',
        120: '120%',
        130: '130%',
        136: '136%',
        140: '140%',
      },
      colors: {
        dark: {
          DEFAULT: '#383838',
          100: '#303030',
          200: '#242424',
          300: '#444444',
          500: '#565656',
        },

        blue: '#0B0A67',
        light_red: '#FEEBF0',
        pink: '#FFF6F9',
        light_pink: 'rgba(246, 37, 89, 0.1)',
        orange: '#EF7F1A',
        red: {
          DEFAULT: '#EF7F1A',
          200: '#FF0000',
        },
        yellow: '#F8AF02',
        green: '#26D176',
        dark_green: '#12A78C',
        secondary_red: '#f9524e',
        gray: {
          50: 'rgba(120, 120, 128, 0.16)',
          100: '#6F6F6F',
          200: '#9E9EA5',
          300: '#CDCDD0',
          400: '#EAEBED',
          500: '#F2F3F5',
          550: '#F5F6F7',
          600: '#F7F8FA',
          700: 'rgba(56, 56, 56, 0.7)',
          800: 'rgba(56, 56, 56, 0.8)',
          900: '#F2F3F5',
        },
      },
      gridTemplateColumns: {
        '1-max': '1fr max-content',
        'max-1': 'max-content 1fr',
      },
      gridTemplateRows: {
        '1-max': '1fr max-content',
        'max-1': 'max-content 1fr',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        11: '11',
        12: '12',
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        21: '21',
        22: '22',
        23: '23',
        24: '24',
        25: '25',
        26: '26',
        27: '27',
        28: '28',
        29: '29',
      },
      boxShadow: {
        btn: '0px 3px 20px rgba(255, 13, 73, 0.2)',
        toggle:
          '0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06)',
      },
      screens: {
        xs: '375px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1368px',
        '3xl': '1400px',
        '4xl': '1536px',
        '5xl': '1950px',
      },
      fontFamily: {
        proxima: ['Proxima Nova', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), rotateX],
}
