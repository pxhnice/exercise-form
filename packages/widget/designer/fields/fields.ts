import type { WidgetConfigType } from "@exercise-form/components/form-designer/src/designer";
import { definePropType } from "@exercise-form/utils";

export const desFieldsProps = {
  widgetData: {
    type: definePropType<WidgetConfigType>({}),
    default() {
      return {};
    }
  }
};
