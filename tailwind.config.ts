import type { Config } from 'tailwindcss';
import animated from 'tailwindcss-animated';

const mainColor = '#FFC33D';
const secondaryColor = '#0E0A04';
const mainFont = 'Bebas Neue';
const secondaryFont = 'Bangers';
const logoFont = 'Good Timing';

const config: Config = {
  content: [
    './src/*.{js,ts,jsx,tsx,mdx}',
    './src/components/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },

      backgroundColor: {
        primary: mainColor,
        secondary: secondaryColor,
        hq: '#F5F5DC',
      },
      fontFamily: {
        primary: logoFont,
        secondary: secondaryFont,
        terciary: mainFont,
      },
      colors: {
        primary: mainColor,
        secondary: secondaryColor,
      },
      borderColor: {
        primary: mainColor,
      },
      height: {
        max: '34rem',
      },
    },
    keyframes: {
      'infinite-scroll': {
        from: {
          transform: 'translateX(0)',
        },
        to: {
          transform: 'translateX(-100%)',
        },
      },
    },
  },

  plugins: [animated],
};
export default config;
