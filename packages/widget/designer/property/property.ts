import type { DesWidgetConfigType } from "@exercise-form/constants";
import { definePropType } from "@exercise-form/utils";

export const desPropertyProps = {
  settingData: {
    type: definePropType<DesWidgetConfigType>(Object),
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
