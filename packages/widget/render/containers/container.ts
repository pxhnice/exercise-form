import type {
  DesWidgetConfigType,
  DesFormConfigType
} from "@exercise-form/constants";
import { definePropType } from "@exercise-form/utils";

export const renContainerProps = {
  widgetData: {
    type: definePropType<DesWidgetConfigType>(Object),
    default() {
      return {};
    }
  },
  formData: {
    type: definePropType<DesFormConfigType>(Object),
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
