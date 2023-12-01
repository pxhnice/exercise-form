import "@vue/runtime-core"

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    ExButton: typeof import("exercise-form")["ExButton"]
  }
}

export { }