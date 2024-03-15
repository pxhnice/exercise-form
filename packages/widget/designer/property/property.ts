import { DesFormWidget } from "@exercise-form/core";
import { definePropType } from "@exercise-form/utils";

export const desPropertyProps = {
  settingData: {
    type: definePropType<DesFormWidget>(Object),
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
