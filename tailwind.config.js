/** @type {import('tailwindcss').Config} */
import { heroui } from "@heroui/theme";
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,mjs}",
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
};
