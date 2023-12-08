import { PATTERN_TYPE } from "@exercise-form/constants";
import type { DesWidgetListType } from "@exercise-form/constants";
import { definePropType } from "@exercise-form/utils";

export const formRenderProps = {
  patternType: {
    type: String,
    values: PATTERN_TYPE,
    default: "pc"
  },
  widgetList: {
    type: definePropType<DesWidgetListType>(Array),
    default() {
      return [];
    }
  },
  formConfig: {
    type: Object,
    default() {
      return {};
    }
  }
};
