import { ExCodeEditor } from '@exercise-form/components/code-editor';
import { ExFormDesigner } from '@exercise-form/components/form-designer';
import { ExFormRender } from '@exercise-form/components/form-render';
import { desIconInstall } from '@exercise-form/utils';
import { desContainerInstall, desFieldInstall, desPropertyInstall, renContainerInstall } from '@exercise-form/widget';

// import { ExSvgIcon } from '@exercise-form/components/svg-icon';
import type { Plugin } from "vue";

export default [
  ExFormDesigner,
  ExFormRender,
  ExCodeEditor,
  // ExSvgIcon,
  desContainerInstall.default,
  desPropertyInstall.default,
  desFieldInstall.default,
  renContainerInstall.default,
  desIconInstall.default
] as Plugin[];
