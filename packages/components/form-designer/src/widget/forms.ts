import type {
  DesWidgetListType,
  DesFormConfigType
} from "@exercise-form/constants";
import { definePropType } from "@exercise-form/utils";

export const desFormsProps = {
  designer: {
    type: Object,
    default() {
      return {};
    }
  },
  formConfig: {
    type: definePropType<DesFormConfigType>(Object),
    default() {
      return {};
    }
  },
  widgetList: {
    type: definePropType<DesWidgetListType>(Array),
    default() {
      return [];
    }
  }
};
