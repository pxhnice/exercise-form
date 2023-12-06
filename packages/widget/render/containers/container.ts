import type { WidgetConfigType } from "@exercise-form/components/form-designer/src/designer";
import { definePropType } from "@exercise-form/utils";

export const renContainerProps = {
  widgetData: {
    type: definePropType<WidgetConfigType>({}),
    default() {
      return {};
    }
  },
  formData: {
    type: Object,
    default() {
      return {};
    }
  },
  designer: {
    type: Object,
    default() {
      return {};
    }
  }
};
