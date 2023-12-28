/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<any>;
  export default component;
}

declare module "element-plus/dist/locale/zh-cn.mjs";