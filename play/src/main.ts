import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import ExForm from "../../packages/exercise-form";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "element-plus/theme-chalk/dark/css-vars.css";
import "../../packages/exercise-form/dist/index.css";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// app.use(installIcon);
app.use(ElementPlus, { locale: zhCn });
app.use(ExForm);
app.mount("#app");
