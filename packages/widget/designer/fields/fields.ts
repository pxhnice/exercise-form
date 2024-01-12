import type { DesWidget } from "@exercise-form/constants";
import { definePropType } from "@exercise-form/utils";

export const desFieldsProps = {
  widgetData: {
    type: definePropType<DesWidget>(Object),
    default() {
      return {};
    }
  }
};
