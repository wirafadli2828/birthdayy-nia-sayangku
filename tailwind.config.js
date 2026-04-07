/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FFFFF0',
        cream: '#FFFDD0',
        green: '#A9BA9D',
        gold: '#D4AF37',
      },
      fontFamily: {
        serif: ['var(--font-playfair)'],
        sans: ['var(--font-montserrat)'],
      },
    },
  },
  plugins: [],
}
