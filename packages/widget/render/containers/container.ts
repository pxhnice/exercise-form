import type { DesWidget, DesFormConfig } from "@exercise-form/constants";
import { definePropType } from "@exercise-form/utils";

export const renContainerProps = {
  widgetData: {
    type: definePropType<DesWidget>(Object),
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
