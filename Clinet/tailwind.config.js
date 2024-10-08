/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "full-screen": "100vh",
      },
      colors: {
        Cherry: "#CC252C",
        customDark: "rgba(27,27,27,255)",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
