module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        kemo: {
          "0%, 50%": { transform: "translateX(-60ch)" },
          "50%,100%": { transform: "translateX(0)" },
        },
        kemo2: {
          "0%, 50%": { transform: "translateX(-5rem)" },
          "50%,100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        kemo: "kemo 3s ease-out",
        kemo2: "kemo2 1s ease-out ",
        kemo3: "kemo2 2s ease-out ",
        kemo4: "kemo2 3s ease-out ",
        kemo5: "kemo2 4s ease-out ",
    
      },
    },
  },
  plugins: [],
};
