/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // This line finds all your component files
    'node_modules/flowbite-react/lib/esm/**/*.js', // This line finds the Flowbite components
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'), // This line adds the Flowbite plugin
  ],
};