import type { DesWidget } from "@exercise-form/constants";
import { definePropType } from "@exercise-form/utils";

export const desPropertyProps = {
  settingData: {
    type: definePropType<DesWidget>(Object),
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
