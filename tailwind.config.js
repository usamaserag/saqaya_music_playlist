/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        spotifyColor: "#1DB954",
      },
    },
  },
  plugins: [require("daisyui")],
};
