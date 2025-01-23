import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        silver: '#e4e4e4',
        royalBlue: '#30378e',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        default: ['14px', { lineHeight: '18px' }],
        xs: ['16px', { lineHeight: '22px' }],
        xl: ['22px', { lineHeight: '32px' }],
      },
    },
  },
  plugins: [],
};
export default config;
