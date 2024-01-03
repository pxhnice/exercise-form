import type { App } from "vue";

const components = import.meta.glob("./*.vue", { eager: true });

export default function install(app: App) {
  for (const [key, value] of Object.entries(components)) {
    const _name = key.slice(key.lastIndexOf("/") + 1, key.lastIndexOf("."));
    let _value = value as any;
    app.component(_name, _value.default);
  }
}
