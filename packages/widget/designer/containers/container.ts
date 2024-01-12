import type { DesWidget, DesWidgetList } from "@exercise-form/constants";
import { definePropType } from "@exercise-form/utils";

export const desContainerProps = {
  designer: {
    type: Object,
    default() {
      return {};
    }
  },
  widgetData: {
    type: definePropType<DesWidget>(Object),
    default() {
      return {};
    }
  },
  parentList: {
    type: definePropType<DesWidgetList>(Array),
    default() {
      return [];
    }
  },
  widgetSub: {
    type: Number,
    default: 0
  },
  parentData: {
    type: definePropType<DesWidget>(Object),
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
    type: definePropType<DesWidgetList>(Array),
    default() {
      return [];
    }
  }
};
