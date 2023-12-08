import type { DesWidgetConfigType } from "@exercise-form/constants";
import { definePropType } from "@exercise-form/utils";

export const desFieldsProps = {
  widgetData: {
    type: definePropType<DesWidgetConfigType>(Object),
    default() {
      return {};
    }
  }
};
