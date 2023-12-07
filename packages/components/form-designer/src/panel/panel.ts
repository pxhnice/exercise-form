import {
  DesWidgetConfigType,
  DesWidgetListType
} from "@exercise-form/constants";
import { definePropType } from "@exercise-form/utils";

export const desPanelProps = {
  designer: {
    type: Object,
    default() {
      return {};
    }
  },
  formConfig: {
    type: Object,
    default() {
      return {};
    }
  },
  widgetList: {
    type: definePropType<DesWidgetListType>(Array),
    default() {
      return [];
    }
  },
  selectWidget: {
    type: definePropType<DesWidgetConfigType>(Object),
    default() {
      return {};
    }
  },
  selectWidgetId: String,
  patternType: String
};
