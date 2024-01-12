import { makeInstaller } from "./installer";
import { ExCodeEditor } from "@exercise-form/components/code-editor";
import { ExFormDesigner } from "@exercise-form/components/form-designer";
import { ExFormRender } from "@exercise-form/components/form-render";
import {
  desIconInstall,
  desContainerInstall,
  desFieldInstall,
  desPropertyInstall,
  renContainerInstall
} from "@exercise-form/widget";

import type { Plugin } from "vue";

const Components = [
  ExFormDesigner,
  ExFormRender,
  ExCodeEditor,
  desContainerInstall.default,
  desPropertyInstall.default,
  desFieldInstall.default,
  renContainerInstall.default,
  desIconInstall.default
] as Plugin[];

export default makeInstaller([...Components]);
