import { createApp } from "vue";
import App from "./App.vue";
import Draggable from "vuedraggable";
import "virtual:svg-icons-register";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import ExForm from "../../packages";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// import "exercise-form_dev/es/style.css";

// const a = ExForm;
// console.log(ExForm);

const app = createApp(App);
app.component("Draggable", Draggable);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus);
app.use(ExForm);
app.mount("#app");
