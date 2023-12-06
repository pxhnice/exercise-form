import type { App, Plugin } from "vue";

type SFCWithInstall<T> = T & Plugin;
export const withInstall = <T>(comP: T, components: Plugin[] = []) => {
  (comP as SFCWithInstall<T>).install = (app: App) => {
    const name = (comP as any).name;
    console.log(app, "app");
    app.component(name, comP as SFCWithInstall<T>);
  };
  return comP as SFCWithInstall<T>;
};
