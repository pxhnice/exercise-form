export * as Copy from "../../packages/icons/svg/copy.svg";
export * as All from "../../packages/icons/svg/all.svg";
import { defineAsyncComponent } from "vue";
import type { AsyncComponentLoader } from "vue";

export const modules = import.meta.glob("../../packages/icons/svg/*.svg");

console.log(modules);

export default function install(app: any) {
  for (const [key, value] of Object.entries(modules)) {
    const name = key.slice(key.lastIndexOf("/") + 1, key.lastIndexOf("."));
    app.component(name, defineAsyncComponent(value as AsyncComponentLoader));
  }
}
