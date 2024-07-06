/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}',  "../yjs/**/*.stories.@(js|jsx|ts|tsx|mdx)", ,  "../yjs/**/*.@(js|jsx|ts|tsx|mdx)"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),

  ],
}

