import { App, defineAsyncComponent } from 'vue';

import type { AsyncComponentLoader } from "vue";

export const modules = import.meta.glob("../icons/svg/*.svg");

export default function install(app: App) {
  for (const [key, value] of Object.entries(modules)) {
    const name = key.slice(key.lastIndexOf("/") + 1, key.lastIndexOf("."));
    app.component(`ex-icon-${name}`, defineAsyncComponent(value as AsyncComponentLoader));
  }
}