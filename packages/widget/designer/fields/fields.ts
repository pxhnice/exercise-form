import { DesFormWidget } from "@exercise-form/core";
import { definePropType } from "@exercise-form/utils";

export const desFieldsProps = {
  widgetData: {
    type: definePropType<DesFormWidget>(Object),
    default() {
      return {};
    }
  }
};
