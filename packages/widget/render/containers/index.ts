import { defineAsyncComponent } from "vue";
import type { AsyncComponentLoader } from "vue";
const components = import.meta.glob("./*.vue");

export default function install(app: any) {
  for (const [key, value] of Object.entries(components)) {
    const name = key.slice(key.lastIndexOf("/") + 1, key.lastIndexOf("."));
    app.component(name, defineAsyncComponent(value as AsyncComponentLoader));
  }
}
