export const modules = import.meta.glob("../icons/svg/*.svg", { eager: true });

export default function install(app: any) {
  for (const [key, value] of Object.entries(modules)) {
    const _name = key.slice(key.lastIndexOf("/") + 1, key.lastIndexOf("."));
    let _value = value as any;
    app.component(`ex-icon-${_name}`, _value.default);
  }
}
