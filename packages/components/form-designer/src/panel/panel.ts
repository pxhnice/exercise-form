import {
  DesFormWidget,
  DesFormConfig,
  DesFormTemplateData,
  DesUseWidgetMethods
} from "@exercise-form/core";
import { definePropType } from "@exercise-form/utils";

export const desPanelProps = {
  designer: {
    type: definePropType<DesUseWidgetMethods>(Object),
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
