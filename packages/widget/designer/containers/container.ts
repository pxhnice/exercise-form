import type {
  DesWidgetConfigType,
  DesWidgetListType
} from "@exercise-form/constants";
import { definePropType } from "@exercise-form/utils";

export const desContainerProps = {
  designer: {
    type: Object,
    default() {
      return {};
    }
  },
  widgetData: {
    type: definePropType<DesWidgetConfigType>(Object),
    default() {
      return {};
    }
  },
  parentList: {
    type: definePropType<DesWidgetListType>(Array),
    default() {
      return [];
    }
  },
  widgetSub: {
    type: Number,
    default: 0
  },
  parentData: {
    type: definePropType<DesWidgetConfigType>(Object),
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
    type: definePropType<DesWidgetListType>(Array),
    default() {
      return [];
    }
  }
};
