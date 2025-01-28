/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontFamily: {
      display: ["Catamaran", "sans-serif"],
      body: ["Poppins", "sans-serif"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#1a1d2d",
      white: "#fff",
      background: "#1a1d2d",
      "background-secondary": "#232738",
      item: "#2b2f43",
      primary: "#5c8aff",
      button: "#363b54",
      rare: {
        from: "#d595db",
        to: "#6d567f",
      },
      legendary: {
        from: "#ffb952",
        to: "#8d6b3d",
      },
      gray: {
        100: "#f5f6f9",
        200: "#e2e4e9",
        300: "#d1d3dc",
        400: "#9da1b4",
        500: "#7c819a",
        600: "#5c6180",
        700: "#424867",
        800: "#2b2f43",
        900: "#1a1d2d",
      },
      status: {
        live: {
          text: "#10B981", // Emerald 500
          dot: "#34D399", // Emerald 400
        },
        ended: {
          text: "#EF4444", // Red 500
          dot: "#F87171", // Red 400
        },
        starting: {
          text: "#F59E0B", // Amber 500
          dot: "#FBBF24", // Amber 400
        },
        ending: {
          text: "#FB923C", // Orange 500
          dot: "#FDBA74", // Orange 400
        },
      },
    },
    extend: {
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        rare: "0 0 0 3px rgba(213, 149, 219, 0.3)",
        legendary: "0 0 0 3px rgba(255, 185, 82, 0.3)",
        outline: "0 0 0 2px #5c8aff",
        select: "0 20px 16px rgba(0, 0, 0, 0.5)",
        search: "0 4px 12px rgba(0, 0, 0, 0.3), 0 -1px 0 rgba(0, 0, 0, 0.2)",
      },
      spacing: {
        14: "3.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out",
        highlight: "highlight 1s ease-in-out",
        blink: "blink 1s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        highlight: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.02)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        blink: {
          "0%": {
            boxShadow:
              "0 0 5px rgba(92, 138, 255, 0.8), 0 0 10px rgba(92, 138, 255, 0.6), 0 0 15px rgba(92, 138, 255, 0.4)",
          },
          "50%": {
            boxShadow:
              "0 0 10px rgba(92, 138, 255, 0.4), 0 0 20px rgba(92, 138, 255, 0.3), 0 0 30px rgba(92, 138, 255, 0.2)",
          },
          "100%": {
            boxShadow:
              "0 0 5px rgba(92, 138, 255, 0.8), 0 0 10px rgba(92, 138, 255, 0.6), 0 0 15px rgba(92, 138, 255, 0.4)",
          },
        },
      },
      backgroundImage: {
        "month-gradient":
          "linear-gradient(90deg, rgba(26, 29, 45, 0) 0%, rgb(35, 39, 56, 100) 10%, rgb(35, 39, 56, 100) 90%, rgba(26, 29, 45, 0) 100%)",
        "modal-watermark":
          "linear-gradient(to top, rgba(35, 39, 56, 0.95), rgba(35, 39, 56, 0) 100%)",
      },
      backdropBlur: {
        modal: "6px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-custom": {
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#1a1d2d",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#363b54",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: "#424867",
            },
          },
          scrollbarWidth: "thin",
          scrollbarColor: "#363b54 #1a1d2d",
        },
      });
    },
  ],
};
