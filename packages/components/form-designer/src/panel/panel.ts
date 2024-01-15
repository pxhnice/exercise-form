import {
  DesWidget,
  DesWidgetList,
  DesFormConfig
} from "@exercise-form/constants";
import type { DesTemplateData } from "@exercise-form/constants";
import { definePropType } from "@exercise-form/utils";

export const desPanelProps = {
  designer: {
    type: Object,
    default() {
      return {};
    }
  },
  formConfig: {
    type: definePropType<DesFormConfig>(Object),
    default() {
      return {};
    }
  },
  widgetList: {
    type: definePropType<DesWidgetList>(Array),
    default() {
      return [];
    }
  },
  selectWidget: {
    type: definePropType<DesWidget>(Object),
    default() {
      return {};
    }
  },
  selectWidgetId: {
    type: String,
    default: " "
  },
  templateList: {
    type: definePropType<Array<DesTemplateData>>(Array),
    default() {
      return [];
    }
  }
};
