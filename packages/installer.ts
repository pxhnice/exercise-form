import Draggable from "vuedraggable";
import axios from "axios";
import type { App, Plugin } from "vue";

window.axios = axios;

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App) => {
    components.forEach((c) => app.use(c));
    app.component("Draggable", Draggable);
  };
  return {
    install,
    version: "0.0.0-dev.1"
  };
};
