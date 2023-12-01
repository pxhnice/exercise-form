import "@vue/runtime-core"
import * as component from "@exercise-form/components"

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    ExButton: typeof component.ExButton
  }
}

export { }