import type { DesFormConfigType } from "@exercise-form/constants";
import { definePropType } from "@exercise-form/utils";

/**
 * 1.自定义组件扩展{
 *
 * }
 *
 *
 *
 *
 */

export const formDesignerEmits = {
  change: (val: string) => val
};

export const formDesignerProps = {
  /**
   * @description 表单配置项
   */
  formData: {
    type: definePropType<DesFormConfigType>(Object),
    default() {
      return {};
    }
  },
  /**
   * @description 数据
   */
  formJson: {
    type: Object,
    default() {
      return {};
    }
  },
  /**
   * @description 组件禁用列表
   */
  bannedWidegets: {
    type: Array,
    default() {
      return [];
    }
  },
  /**
   * @description 构造器显示配置项
   */
  optionData: {
    type: Object,
    default() {
      return {
        treeFormButton: true, //是否显示预览表单按钮
        previewFormButton: true, //是否显示预览表单按钮
        importJsonButton: true, //是否显示导入JSON按钮
        exportJsonButton: true, //是否显示导出JSON器按钮
        exportCodeButton: true, //是否显示导出代码按钮
        generateSFCButton: true, //是否显示生成SFC按钮
        pageTypeButton: true, //是否显示导出页面类型按钮
        resetFormJson: false //是否初始化重置表单为空
      };
    }
  },
  // 主题
  dark: Boolean
};
