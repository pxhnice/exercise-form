import type {
  DesWidgetListType,
  DesFormConfigType
} from "@exercise-form/constants";
import { definePropType } from "@exercise-form/utils";

export const formRenderProps = {
  /**
   * @description 构造组件列表
   */
  widgetList: {
    type: definePropType<DesWidgetListType>(Array),
    default() {
      return [];
    }
  },
  /**
   * @description 构造表单配置
   */
  formConfig: {
    type: definePropType<DesFormConfigType>(Object),
    default() {
      return {};
    }
  }
};
