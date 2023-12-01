import type { App, Plugin } from "vue";
import { version } from "./exercise-form/package.json";

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App) => {
    components.forEach((c) => app.use(c));
  };
  return {
    install,
    version
  };
};
