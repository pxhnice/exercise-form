import { InjectionKey, Ref } from "vue";
import { definePropType } from "@exercise-form/utils";
import {
  DesFormParams,
  DesFormTemplateData,
  DesFormToolbarOptions
} from "@exercise-form/core";

export const optionsKeys: InjectionKey<Ref<DesFormToolbarOptions>> = Symbol();

export const bannedWidgetKeys: InjectionKey<Ref<Array<string>>> = Symbol();

export const darkKeys: InjectionKey<Ref<boolean>> = Symbol();

export const formDesignerEmits = {
  change: (desData: DesFormParams) => desData
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
    type: definePropType<DesFormParams>(Object),
    default() {
      return {};
    }
  },
  /**
   * @description 构造器显示配置项
   */
  options: {
    type: definePropType<DesFormToolbarOptions>(Object),
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
  // /**
  //  * @description 自定义添加组件[cname]
  //  */
  // customWidgets: {
  //   type: Array,
  //   default() {
  //     return [];
  //   }
  // },
  // /**
  //  * @description 自定义属性设置组件
  //  */
  // settingProperty: {
  //   type: Array,
  //   default() {
  //     return [];
  //   }
  // },
  /**
   * @description 模板列表
   */
  templateList: {
    type: definePropType<Array<DesFormTemplateData>>(Array),
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
   * vue-codemirror需要dark为true
   */
  dark: Boolean
};
