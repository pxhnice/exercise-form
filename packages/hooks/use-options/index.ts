import { DesWidget } from '@exercise-form/constants';
import { computed, ref, watch } from 'vue';

export const useOptions = (widget: DesWidget) => {
  const selectValue = ref(widget.options.modelDefaultValue);

  const options = computed(() => {
    let { optionsItem } = widget.options;
    if (optionsItem) return optionsItem;
    return [];
  });

  const label = computed(() => {
    let { optionsLabel } = widget.options;
    if (optionsLabel) return optionsLabel;
    return "label";
  });

  const value = computed(() => {
    let { optionsValue } = widget.options;
    if (optionsValue) return optionsValue;
    return "label";
  });

  watch(
    () => widget.options.modelDefaultValue,
    (val) => {
      selectValue.value = val;
    }
  );

  return {
    selectValue,
    options,
    value,
    label
  };
};
