import { definePropType } from "@exercise-form/utils";
import { InjectionKey, Ref } from "vue";
import type {
  DesFormConfigType,
  DesWidgetListType
} from "@exercise-form/constants";

export type DesOptionsDataType = {
  templateButton: boolean;
  previewFormButton: boolean;
  treeFormButton: boolean;
  exportJsonButton: boolean;
  exportCodeButton: boolean;
  generateSFCButton: boolean;
  pageTypeButton: boolean;
  copyDataButton: boolean;
  saveFileButton: boolean;
  resetFormJson: boolean;
};

type formJsonType = {
  formConfig: DesFormConfigType;
  widgetList: DesWidgetListType;
};

export const optionsKeys: InjectionKey<Ref<DesOptionsDataType>> = Symbol();

export const bannedWidgetKeys: InjectionKey<Ref<Array<string>>> = Symbol();

export const formDesignerEmits = {
  change: (desData: formJsonType) => desData
};

export const formDesignerProps = {
  /**
   * @description 表单数据
   */
  formData: {
    type: Object,
    default() {
      return {};
    }
  },
  /**
   * @description 构建数据
   */
  formJson: {
    type: definePropType<formJsonType>(Object),
    default() {
      return {};
    }
  },
  /**
   * @description 构造器显示配置项
   */
  optionsData: {
    type: definePropType<DesOptionsDataType>(Object),
    default() {
      return {
        templateButton: false, //是否显示模版栏
        treeFormButton: true, //是否显示预览表单按钮
        previewFormButton: true, //是否显示预览表单按钮
        exportJsonButton: true, //是否显示导出JSON器按钮
        exportCodeButton: true, //是否显示导出代码按钮
        generateSFCButton: true, //是否显示生成SFC按钮
        pageTypeButton: true, //是否显示导出页面类型按钮
        copyDataButton: true, //是否显示复制按钮
        saveFileButton: true, //是否显示导出文件按钮
        resetFormJson: false //是否初始化重置表单为空
      };
    }
  },
  /**
   * @description 组件禁用列表
   */
  bannedWidgets: {
    type: definePropType<Array<string>>(Array),
    default() {
      return [];
    }
  },
  /**
   * @description 自定义添加组件[cname]
   */
  customWidgets: {
    type: Array,
    default() {
      return [];
    }
  },
  /**
   * @description 自定义属性设置组件
   */
  settingProperty: {
    type: Array,
    default() {
      return [];
    }
  },
  // 主题
  dark: Boolean
};
