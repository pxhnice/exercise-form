<template>
  <div class="form-widget">
    <div class="widget-container">
      <div class="widget-container-box">
        <el-scrollbar
          class="widget-box-scrollbar"
          :class="{
            'box-pc': patternType == 'pc',
            'box-pad': patternType == 'pad',
            'box-h5': patternType == 'h5'
          }"
        >
          <el-form
            ref="formRef"
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
                  :designer="designer"
                  :form-data="formData"
                  :key="item.id"
                />
              </template>
              <template v-else>
                <form-item
                  :widget-data="item"
                  :designer="designer"
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
import { MODEL_TYPE_LIST } from "@exercise-form/constants";
import { formRenderProps } from "./form-render";

defineOptions({ name: "ex-form-render" });
const props = defineProps(formRenderProps);

const formRef = ref<FormInstance>();
const formData = ref<{ [key: string]: any }>({});
const originalData = ref<{ [key: string]: any }>({});
const disabled = ref(false);

const buildDefalutValueListFn = () => {
  return function (widget: any) {
    if (MODEL_TYPE_LIST.includes(widget.type)) {
      let modelFefaultValue = widget.options.modelFefaultValue;
      formData.value[widget.id] = modelFefaultValue ?? null;
    }
  };
};

const addFormName = () => {
  traverseFieldWidget(props.widgetList, (widget) => {
    buildDefalutValueListFn()(widget);
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
.widget-box-scrollbar {
  background-color: #fff;
  padding: 0px !important;
}
.box-pc {
  width: 100%;
  border: 1px solid #fff;
  // border-radius: 10px;
}
.box-pad,
.box-h5 {
  border: 10px solid #000;
  border-radius: 30px;
}
.box-pad {
  max-width: 960px;
  margin: 0 auto;
}
.box-h5 {
  max-width: 460px;
  margin: 0 auto;
}
.box-scrollbar {
  width: 100%;
  height: 100%;
  background-color: #fff;
}

:deep(.el-scrollbar__view) {
  width: 100%;
  height: 100%;
}

.tips {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  text-align: center;
  color: var(--el-color-primary-light-3);
}
</style>
