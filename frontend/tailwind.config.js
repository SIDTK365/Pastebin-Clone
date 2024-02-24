/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{html,js}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
