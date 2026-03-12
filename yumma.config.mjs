import { defineConfig } from "yummacss"

export default defineConfig({
  source: ["src/**/*.{ts,tsx}"],
  output: "src/styles/out.css",
  buildOptions: {
    reset: true,
  },
});
