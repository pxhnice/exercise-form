import "@vue/runtime-core"

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    ExFormDesigner: typeof import("../packages/exercise-form")["ExFormDesigner"],
    ExFormRender: typeof import("../packages/exercise-form")["ExFormRender"]
  }
}

export { }