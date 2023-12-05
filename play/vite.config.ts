import { defineConfig } from "vite";
import path from "node:path";
import vue from "@vitejs/plugin-vue";
import DefineOptions from "unplugin-vue-define-options/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

export default defineConfig({
  plugins: [
    vue(),
    DefineOptions(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "../packages/icons/svg")],
      symbolId: "icon-[name]"
    })
  ]
});
