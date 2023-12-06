import type { WidgetConfigType } from "@exercise-form/components/form-designer/src/designer";
import { definePropType } from "@exercise-form/utils";

export const desContainerProps = {
  widgetData: {
    type: definePropType<WidgetConfigType>({}),
    default() {
      return {};
    }
  },
  parentList: {
    type: definePropType<Array<WidgetConfigType>>([]),
    default() {
      return [];
    }
  },
  widgetSub: {
    type: Number,
    default: 0
  },
  parentData: {
    type: definePropType<WidgetConfigType>({}),
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
