import { ExFormDesigner } from "@exercise-form/components/form-designer";
import { ExFormRender } from "@exercise-form/components/form-render";
import { ExCodeEditor } from "@exercise-form/components/code-editor";
import { ExSvgIcon } from "@exercise-form/components/svg-icon";

import type { Plugin } from "vue";

export default [
  ExFormDesigner,
  ExFormRender,
  ExCodeEditor,
  ExSvgIcon
] as Plugin[];
