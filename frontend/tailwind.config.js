/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        customGray: '#E0E0E0',
        fontGray:'#757575',
        inputBorder:'#E0E0E0',
        linkColor: '#0052EA',
        iconColor: '#EFEFEF'
        
      },
      fontFamily: {
        custom: ['Inter'] 
      }
    },
  },
  plugins: [],
}

