import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    OrangeYellow: "#f5bd0a",
    Bittersweet: "#fc6c58",
    Keppel: "#5abaab",
    RocketMetallic: "#7d6f6c",
    Cultured: "#f6f5f5",
  },
  generic: {
    White: "#ffffff",
    Black: "#000000",
  },
};

const fonts = {
  body: "system-ui, sans-serif",
  heading: "Titan One, serif",
  mono: "Menlo, monospace",
};

export default extendTheme({ colors, fonts });
