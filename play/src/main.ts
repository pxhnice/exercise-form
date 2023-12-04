import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import ExForm from "../../packages";
// import "exercise-form_dev/es/style.css";

const a = ExForm;
console.log(ExForm);

const app = createApp(App);
app.use(ElementPlus);
app.use(ExForm);
app.mount("#app");
