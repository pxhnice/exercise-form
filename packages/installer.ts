import "virtual:svg-icons-register";
import Draggable from "vuedraggable";
import type { App, Plugin } from "vue";

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
