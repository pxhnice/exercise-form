import { DesFormWidget, DesFormConfig } from "@exercise-form/core";
import { definePropType } from "@exercise-form/utils";

export const renContainerProps = {
  widgetData: {
    type: definePropType<DesFormWidget>(Object),
    default() {
      return {};
    }
  },
  formData: {
    type: definePropType<DesFormConfig>(Object),
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
