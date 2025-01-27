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
        silver: "#fff",
        royalBlue: "#30378e",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
      fontSize: {
        default: ["16px", { lineHeight: "24px" }],
        xs: ["16px", { lineHeight: "22px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["38px", { lineHeight: "48px" }],
      },
    },
    container: {
      center: true,
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      padding: {
        DEFAULT: "24px",
        "2xl": "100px",
      },
    },
  },
  plugins: [],
};
export default config;
