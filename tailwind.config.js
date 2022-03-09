module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: '0',
      margin: '0',
    },
    fontFamily: {
      sans: ['Encode sans', 'sans-serif'],
      serif: ['Encode sans', 'serif'],
    },
    extend: {
      colors: {
        'kjBlue': '#264296',
        'kjOrange': '#f58227',
      },
    },
  },
  plugins: [
  ],
}
