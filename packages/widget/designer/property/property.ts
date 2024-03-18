import { DesFormWidget, DesUseWidgetMethods } from "@exercise-form/core";
import { definePropType } from "@exercise-form/utils";

export const desPropertyProps = {
  designer: {
    type: definePropType<DesUseWidgetMethods>(Object),
    default() {
      return {};
    }
  },
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
  }
};
