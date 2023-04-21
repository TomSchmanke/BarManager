const plugin = require('tailwindcss/plugin');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        h1: { '@apply text-3xl font-bold underline': {} },
        h2: { '@apply text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800': {} },
      });
    }),
  ],
};
