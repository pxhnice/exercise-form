import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  base: "./",
  plugins: [vue(), svgLoader()],
  server: {
    open: true
  }
});
