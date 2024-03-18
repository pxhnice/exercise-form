import { DesFormWidget, DesUseWidgetMethods } from "@exercise-form/core";
import { definePropType } from "@exercise-form/utils";

export const desContainerProps = {
  designer: {
    type: definePropType<DesUseWidgetMethods>(Object),
    default() {
      return {};
    }
  },
  widgetData: {
    type: definePropType<DesFormWidget>(Object),
    default() {
      return {};
    }
  },
  parentList: {
    type: definePropType<DesFormWidget[]>(Array),
    default() {
      return [];
    }
  },
  widgetSub: {
    type: Number,
    default: 0
  },
  parentData: {
    type: definePropType<DesFormWidget>(Object),
    default() {
      return {};
    }
  },
  widgetRow: {
    type: Number,
    default: 0
  },
  rowLength: {
    type: Number,
    default: 0
  },
  colLength: {
    type: Number,
    default: 0
  },
  colList: {
    type: definePropType<DesFormWidget[]>(Array),
    default() {
      return [];
    }
  }
};
