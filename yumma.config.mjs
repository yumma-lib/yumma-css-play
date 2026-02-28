/** @type {import('@yummacss/nitro').Config} */
export default {
  source: ["src/**/*.{ts,tsx}"],
  output: "src/styles/out.css",
  buildOptions: {
    reset: true,
    minify: false,
  },
};
