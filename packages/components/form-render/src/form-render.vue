<template>
  <div class="ex-render">
    <div class="ex-forms-container bg">
      <div class="ex-forms-container-box">
        <el-scrollbar
          class="ex-forms-box-scrollbar"
          :class="{
            'ex-box-pc': formConfig.patternType == 'pc',
            'ex-box-pad': formConfig.patternType == 'pad',
            'ex-box-h5': formConfig.patternType == 'h5'
          }"
        >
          <el-form
            ref="formRef"
            class="ex-render-form"
            :model="formData"
            v-bind="formConfig"
            :disabled="disabled"
          >
            <template v-for="item in widgetList" :key="item.id">
              <template v-if="item.category === 'container'">
                <component
                  :is="`${item.type}-item`"
                  :widget-data="item"
                  :form-data="formData"
                  :key="item.id"
                />
              </template>
              <template v-else>
                <form-item
                  :widget-data="item"
                  :form-data="formData"
                  :key="item.id"
                />
              </template>
            </template>
          </el-form>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { FormInstance } from "element-plus";
import { deepClone } from "@exercise-form/utils";
import { MODEL_LIST, DesFormWidget } from "@exercise-form/core";
import { traverseFieldWidget } from "@exercise-form/core/src/generator/vue3Js";

import { formRenderProps } from "./form-render";

defineOptions({ name: "ExFormRender" });
const props = defineProps(formRenderProps);

const formRef = ref<FormInstance>();
const formData = ref<{ [key: string]: any }>({});
const originalData = ref<{ [key: string]: any }>({});
const disabled = ref(false);

const buildDefaultValueListFn = () => {
  return function (widget: DesFormWidget) {
    if (MODEL_LIST.includes(widget.type)) {
      let { modelDefaultValue, name } = widget.options;
      formData.value[name] = modelDefaultValue ?? null;
    }
  };
};

const addFormName = () => {
  let { widgetList, formConfig } = props;
  traverseFieldWidget({
    widgetList,
    formConfig,
    cb: (widget) => {
      buildDefaultValueListFn()(widget);
    }
  });
  originalData.value = deepClone(formData.value);
};

const ondisabled = () => {
  disabled.value = true;
};

const undisable = () => {
  disabled.value = false;
};

const resetForm = () => {
  formData.value = deepClone(originalData.value);
};

onMounted(() => {
  addFormName();
});

defineExpose({
  ondisabled,
  undisable,
  resetForm,
  originalData
});
</script>
