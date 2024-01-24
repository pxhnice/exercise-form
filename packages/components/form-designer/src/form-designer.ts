import { definePropType } from "@exercise-form/utils";
import { InjectionKey, Ref } from "vue";
import type { DesFormJson, DesTemplateData } from "@exercise-form/constants";

export type DesOptions = {
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

export const optionsKeys: InjectionKey<Ref<DesOptions>> = Symbol();

export const bannedWidgetKeys: InjectionKey<Ref<Array<string>>> = Symbol();

export const darkKeys: InjectionKey<Ref<boolean>> = Symbol();

export const formDesignerEmits = {
  change: (desData: DesFormJson) => desData
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
    type: definePropType<DesFormJson>(Object),
    default() {
      return {};
    }
  },
  /**
   * @description 构造器显示配置项
   */
  options: {
    type: definePropType<DesOptions>(Object),
    default() {
      return {};
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
    type: definePropType<Array<DesTemplateData>>(Array),
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
