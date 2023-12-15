<template>
  <div class="form-widget">
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
            style="width: 100%; height: 100%"
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
import { traverseFieldWidget, deepClone } from "@exercise-form/utils";
import { MODEL_TYPE_LIST, DesWidgetConfigType } from "@exercise-form/constants";
import { formRenderProps } from "./form-render";

defineOptions({ name: "ex-form-render" });
const props = defineProps(formRenderProps);

const formRef = ref<FormInstance>();
const formData = ref<{ [key: string]: any }>({});
const originalData = ref<{ [key: string]: any }>({});
const disabled = ref(false);

const buildDefaultValueListFn = () => {
  return function (widget: DesWidgetConfigType) {
    if (MODEL_TYPE_LIST.includes(widget.type)) {
      let { modelDefaultValue, name } = widget.options;
      formData.value[name] = modelDefaultValue ?? null;
    }
  };
};

const addFormName = () => {
  traverseFieldWidget(props.widgetList, (widget) => {
    buildDefaultValueListFn()(widget);
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

<style lang="scss" scoped>
.form-widget {
  width: 100%;
  height: 100%;
  display: flex;
}
.bg {
  background: #fff;
}
</style>
