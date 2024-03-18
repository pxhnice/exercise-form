import {
  DesFormWidget,
  DesFormConfig,
  DesUseWidgetMethods
} from "@exercise-form/core";
import { definePropType } from "@exercise-form/utils";

export const renContainerProps = {
  designer: {
    type: definePropType<DesUseWidgetMethods>(Object),
    default() {
      return {};
    }
  },
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
  }
};
