import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import DefineOptions from "unplugin-vue-define-options/vite";

export default defineConfig({
  plugins: [vue(), vueJsx(), DefineOptions()],
  test: {
    environment: "happy-dom"
  }
});
