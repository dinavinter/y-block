  

/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
 
  content:  [
    "./index.html",
      "./play.html",
    "./src/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },


    },
    extend: {},
  },
  plugins: [
 
    require('@tailwindcss/aspect-ratio')

  ]
}

