import type { WidgetConfigType } from "@exercise-form/components/form-designer/src/designer";
import { definePropType } from "@exercise-form/utils";

export const desPropertyProps = {
  settingData: {
    type: definePropType<WidgetConfigType>({}),
    default() {
      return {};
    }
  },
  optionsModel: {
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
