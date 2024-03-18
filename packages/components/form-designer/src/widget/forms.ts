import {
  DesFormWidget,
  DesFormConfig,
  DesUseWidgetMethods
} from "@exercise-form/core";
import { definePropType } from "@exercise-form/utils";

export const desFormsProps = {
  designer: {
    type: definePropType<DesUseWidgetMethods>(Object),
    default() {
      return {};
    }
  },
  formConfig: {
    type: definePropType<DesFormConfig>(Object),
    default() {
      return {};
    }
  },
  widgetList: {
    type: definePropType<DesFormWidget[]>(Array),
    default() {
      return [];
    }
  }
};
