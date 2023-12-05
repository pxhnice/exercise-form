export const formDesignerEmits = {
  change: (val: string) => val
};

export const formDesignerProps = {
  formData: {
    type: Object,
    default() {
      return {};
    }
  },
  formJson: {
    type: Object,
    default() {
      return {};
    }
  },
  // 配置项
  optionData: {
    type: Object
  },
  dark: Boolean
};
