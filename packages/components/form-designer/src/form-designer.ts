import { definePropType } from "@exercise-form/utils";
import { InjectionKey, Ref } from "vue";
import type {
  DesFormJsonType,
  DesTemplateDataType
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

export const optionsKeys: InjectionKey<Ref<DesOptionsDataType>> = Symbol();

export const bannedWidgetKeys: InjectionKey<Ref<Array<string>>> = Symbol();

export const darkKeys: InjectionKey<Ref<boolean>> = Symbol();

export const formDesignerEmits = {
  change: (desData: DesFormJsonType) => desData
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
    type: definePropType<DesFormJsonType>(Object),
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
        templateButton: true, //是否显示模版栏
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
  /**
   * @description 模板列表
   */
  templateList: {
    type: definePropType<Array<DesTemplateDataType>>(Array),
    default() {
      return [];
    }
  },
  /**
   * @description  主题颜色
   */
  themeColor: String,
  /**
   * @description  主题模式
   * ？？？ 由于部分element组件使用Teleport被插入到body下，导致无法修改样式
   * 推荐使用element=> <html class="dark">
   * vue-codemirror需要dark为true
   */
  dark: Boolean
};
