import type { DesWidgetList, DesFormConfig } from "@exercise-form/constants";
import { definePropType } from "@exercise-form/utils";

export const desFormsProps = {
  designer: {
    type: Object,
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
    type: definePropType<DesWidgetList>(Array),
    default() {
      return [];
    }
  }
};
