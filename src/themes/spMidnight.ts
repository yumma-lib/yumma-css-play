import { SandpackTheme } from "@codesandbox/sandpack-react";

const customSpTheme: SandpackTheme = {
  colors: {
    accent: "#FFFFFF",
    base: "#85B1E0",
    clickable: "#ABB2DC",
    disabled: "#979CAC",
    error: "#FF9499",
    errorSurface: "#21243F",
    hover: "#FFFFFF",
    surface1: "#21243F",
    surface2: "#31365E",
    surface3: "#2d3151",
  },
  syntax: {
    plain: "#B9BED5",
    comment: {
      color: "#B9BED5",
      fontStyle: "italic",
    },
    definition: "#85B1E0",
    keyword: "#85B1E0",
    property: "#DDA2F6",
    punctuation: "#939293",
    static: "#AB9DF2",
    string: "#BEC6F2",
    tag: "#85B1E0",
  },
  font: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    lineHeight: "20px",
    mono: '"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
    size: "15px",
  },
};

export default customSpTheme;
