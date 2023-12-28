import "@vue/runtime-core"

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    ExFormDesigner: typeof import("exercise-form")["ExFormDesigner"],
    ExFormRender: typeof import("exercise-form")["ExFormRender"]
  }
}

export { }