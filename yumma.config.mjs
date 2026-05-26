import { defineConfig } from "yummacss";

export default defineConfig({
  source: ["src/**/*.{ts,tsx}"],
  output: "src/styles/out.css",
  safelist: ["bg-page/90"],
  buildOptions: {
    reset: true,
  },
  theme: {
    colors: {
      accent: "#bec6f2",
      border: "#31365e",
      muted: "#6b7194",
      page: "#151724",
      surface: "#1e2039",
      "surface-dim": "#21243f",
    },
  },
});
