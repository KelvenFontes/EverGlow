/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'girl-background': 'url(/img_girl.png)'
      },
      colors: {
        primary: '#3bc0d2',
        primaryDarker: '#00acc4'
      }
    },
  },
  plugins: [],
}
