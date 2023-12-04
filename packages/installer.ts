import type { App, Plugin } from "vue";

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App) => {
    components.forEach((c) => app.use(c));
  };
  return {
    install,
    version: "0.0.0-dev.1"
  };
};
