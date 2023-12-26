import {
  DesWidgetConfigType,
  DesWidgetListType,
  DesFormConfigType
} from "@exercise-form/constants";
import type { DesTemplateDataType } from "@exercise-form/constants";
import { definePropType } from "@exercise-form/utils";

export const desPanelProps = {
  designer: {
    type: Object,
    default() {
      return {};
    }
  },
  formConfig: {
    type: definePropType<DesFormConfigType>(Object),
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
  selectWidgetId: {
    type: String,
    default: " "
  },
  templateList: {
    type: definePropType<Array<DesTemplateDataType>>(Array),
    default() {
      return [];
    }
  }
};
