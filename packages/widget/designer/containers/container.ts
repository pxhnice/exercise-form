import type {
  DesWidgetConfigType,
  DesWidgetListType
} from "@exercise-form/constants";
import { definePropType } from "@exercise-form/utils";

export const desContainerProps = {
  widgetData: {
    type: definePropType<DesWidgetConfigType>({}),
    default() {
      return {};
    }
  },
  parentList: {
    type: definePropType<DesWidgetListType>([]),
    default() {
      return [];
    }
  },
  widgetSub: {
    type: Number,
    default: 0
  },
  parentData: {
    type: definePropType<DesWidgetConfigType>({}),
    default() {
      return {};
    }
  },
  designer: {
    type: Object,
    default() {
      return {};
    }
  }
};
