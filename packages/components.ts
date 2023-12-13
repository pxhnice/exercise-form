import { ExCodeEditor } from '@exercise-form/components/code-editor';
import { ExFormDesigner } from '@exercise-form/components/form-designer';
import { ExFormRender } from '@exercise-form/components/form-render';
import { ExSvgIcon } from '@exercise-form/components/svg-icon';
import { desContainerInstall, desFieldInstall, desPropertyInstall, renContainerInstall } from '@exercise-form/widget';

import type { Plugin } from "vue";

export default [
  ExFormDesigner,
  ExFormRender,
  ExCodeEditor,
  ExSvgIcon,
  desContainerInstall.default,
  desPropertyInstall.default,
  desFieldInstall.default,
  renContainerInstall.default
] as Plugin[];
