import vue from "@vitejs/plugin-vue";
import DefineOptions from "unplugin-vue-define-options/vite";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import svgLoader from "vite-svg-loader";
import {
  exEsPath,
  exLibPath,
  pkgPath,
  exTsConfigPath,
  generateExternal
} from "./src";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: [exEsPath, exLibPath],
      tsconfigPath: exTsConfigPath
    }),
    DefineOptions(),
    svgLoader()
  ],
  build: {
    outDir: "es",
    sourcemap: true,
    rollupOptions: {
      external: generateExternal(),
      input: pkgPath,
      output: [
        {
          format: "es",
          entryFileNames: "[name].mjs",
          preserveModules: true,
          exports: "named",
          dir: exEsPath
        },
        {
          format: "cjs",
          entryFileNames: "[name].js",
          preserveModules: true,
          exports: "named",
          dir: exLibPath
        }
      ]
    },
    lib: {
      entry: "index.ts"
    }
  }
});
