/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      primary: {
        90: "#E5F1FC",
        400: "#006DCC",
        500: "#005299",
      },
      secondary: {
        90: "#E5F5F5",
        500: "#008080",
        400: "#009999",
      },
      neutral: {
        0: "#ffffff",
        20: "#2D3748",
        70: "#BEC0C2",
        80: "#CDCFD1",
        98: "#F5F7FA",
        99: "#F7F9FC",
        900: "#EAEBEB",
      },
      gray: {
        900: "#EAEBEB",
      },
      success: {
        400: "#00875A",
      },
      error: {
        400: "#FFB020",
      },
      error: {
        400: "#DC2626",
      },
    },

    fontSize: {
      xs: "0.688rem", // 11px
      sm: "0.812rem", // 13px
      md: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.438rem", // 23px
      "3xl": "1.625rem", // 26px
      "4xl": "1.812rem", // 29px
      "5xl": "2rem", // 32px
      "6xl": "2.250rem", // 36px
      "7xl": "2.562rem", // 41px
      "8xl": "2.875rem", // 46px

      "icon-12": "12px",
      "icon-16": "16px",
      "icon-20": "20px",
      "icon-24": "24px",
      "icon-28": "28px",
    },

    fontFamily: {
      primary: ["Inter", "sans-serif"],
      secondary: ["Nunito", "sans-serif"],
    },

    extend: {
      spacing: {
        13: "52px",
        15: "60px",
      },
      gridTemplateRows: {
        0: "0fr",
      },
      boxShadow: {
        "btn-default": "0px 13px 16.9px -6px rgba(4, 158, 83, 0.33)",
      },
    },
  },
  plugins: [],
};
