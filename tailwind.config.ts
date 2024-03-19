import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: "#a87133",
        dark: "#764f24",
        darker: "#54391a",
        lighter: "#dcc6ad",
        light: "#c29c70",
        lightest: "#f6f1eb",
      },
    },
  },
  plugins: [],
} satisfies Config;
