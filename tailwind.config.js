/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/shell/src/**/*.{html,ts}",
    "./projects/inspections-mfe/src/**/*.{html,ts}",
    // Add other MFE projects as needed
  ],
  theme: {
    extend: {
      colors: {
        'walsh-primary': '#009845',
        'walsh-primary-dark': '#007D37',
      }
    },
  },
  plugins: [],
}