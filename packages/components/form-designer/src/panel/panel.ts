import {
  DesFormWidget,
  DesFormConfig,
  DesFormTemplateData
} from "@exercise-form/core";
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
    type: definePropType<DesFormWidget[]>(Array),
    default() {
      return [];
    }
  },
  selectWidget: {
    type: definePropType<DesFormWidget>(Object),
    default() {
      return {};
    }
  },
  selectWidgetId: {
    type: String,
    default: " "
  },
  templateList: {
    type: definePropType<DesFormTemplateData[]>(Array),
    default() {
      return [];
    }
  }
};
