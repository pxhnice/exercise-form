import "@vue/runtime-core"

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    ExFormDesigner: typeof import("exercise-form")["ExFormDesigner"],
    ExFormRender: typeof import("exercise-form")["ExFormRender"]
    ExCodeEditor: typeof import("exercise-form")["ExCodeEditor"]
    ExSvgIcon: typeof import("exercise-form")["ExSvgIcon"]
  }
}

export { }