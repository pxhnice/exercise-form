import { ExFormDesigner } from "@exercise-form/components/form-designer";
import { ExFormRender } from "@exercise-form/components/form-render";
import { ExCodeEditor } from "@exercise-form/components/code-editor";
import { ExSvgIcon } from "@exercise-form/components/svg-icon";

import {
  desContainerInsalll,
  desPropertyInsalll,
  desFieldInsalll,
  renContainerInsalll
} from "@exercise-form/widget";

import type { Plugin } from "vue";

export default [
  ExFormDesigner,
  ExFormRender,
  ExCodeEditor,
  ExSvgIcon,
  desContainerInsalll.default,
  desPropertyInsalll.default,
  desFieldInsalll.default,
  renContainerInsalll.default
] as Plugin[];
