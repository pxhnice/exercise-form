import { PATTERN_TYPE } from "@exercise-form/constants";

export const formRenderProps = {
  patternType: {
    type: String,
    values: PATTERN_TYPE,
    default: "pc"
  },
  widgetList: {
    type: Array,
    default() {
      return {};
    }
  },
  formConfig: {
    type: Object,
    default() {
      return {};
    }
  }
};
