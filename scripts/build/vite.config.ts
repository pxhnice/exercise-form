import { defineConfig } from "vite";
import path from "node:path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import DefineOptions from "unplugin-vue-define-options/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { exPackage, exPath } from "./src";

console.log(111111, exPackage, exPath);
console.log(vue, "vvvvvvvvvvvv");

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: [
        "../../packages/exercise-form/es",
        "../../packages/exercise-form/lib"
      ],
      tsconfigPath: "../../tsconfig.json"
    }),
    DefineOptions(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "../../packages/icons/svg")],
      symbolId: "icon-[name]"
    })
  ],
  build: {
    outDir: "es",
    sourcemap: true,
    rollupOptions: {
      external: [
        "vue",
        "element-plus",
        "vue-codemirror",
        "codemirror",
        "@codemirror/lang-css",
        "@codemirror/lang-html",
        "@codemirror/lang-javascript",
        "@codemirror/lang-json",
        "@codemirror/lang-vue",
        "@codemirror/theme-one-dark",
        "file-saver",
        "prettier/plugins/html",
        "prettier/plugins/postcss",
        "prettier/plugins/babel",
        "prettier/plugins/estree",
        "vuedraggable",
        "prettier",
        /\.scss/
      ],
      input: "../../packages/index.ts",
      output: [
        {
          format: "es",
          entryFileNames: "[name].mjs",
          preserveModules: true,
          preserveModulesRoot: "../../packages/exercise-form",
          exports: "named",
          dir: "../../packages/exercise-form/es"
        },
        {
          format: "cjs",
          entryFileNames: "[name].cjs",
          preserveModules: true,
          exports: "named",
          dir: "../../packages/exercise-form/lib"
        }
      ]
    },
    lib: {
      entry: "index.ts"
    }
  }
});
