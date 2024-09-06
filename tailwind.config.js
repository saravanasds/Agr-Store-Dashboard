/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      animation: {
        bounce1: 'bounce 0.6s infinite',
        bounce2: 'bounce 0.6s 0.2s infinite',
        bounce3: 'bounce 0.6s 0.4s infinite',
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
