import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#28283d',
          800: "#1f1f2b",
          950: "#181821",
        },
        secondary: {400: "#9a9cab", 800: '#2c3e50'},
        accent: "#20c997",
        checkout: {
          100: "#fef6f6",
          200: "rgb(227, 192, 183)",
          300: "rgb(216, 159, 142)",
        },
        detail: {
          100: 'rgba(20, 57, 151, 0.05)',
          500: '#143997'
        },
        action: "#0dcaf0",
      },
      fontFamily: {
        impact: ['Impact', 'sans-serif'],
      },
      keyframes: {
        forward: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        backward: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        forward: 'forward 0.3s linear forwards',
        backward: 'backward 0.3s linear forwards',
      },
    },
  },
  plugins: [],
};
export default config;
