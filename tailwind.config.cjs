/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        'player-image': '49%',
      },
      clipPath: {
        'custom': 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)',
      },
      fontFamily: {
        fifa: "fifa-font"
      },
    },
  },
  plugins: [],
};
