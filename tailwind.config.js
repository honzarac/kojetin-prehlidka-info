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
    colors: {
      'kjBlue': '#264296',
      'kjOrange': '#f58227'
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
