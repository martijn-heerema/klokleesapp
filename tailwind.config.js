/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kids: ['"Nunito"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
