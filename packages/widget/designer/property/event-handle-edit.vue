<template>
  <div>
    <el-form-item :label="eventName" label-width="180">
      <el-button @click="handleEventCode" type="primary" icon="Edit" round>
        编写代码
      </el-button>
    </el-form-item>
    <el-dialog
      v-model="isShowEvent"
      width="800"
      title="组件事件编辑"
      @close="cancel"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <div class="ex-dialog-box">
        <div class="name-front">{{ firstName }}</div>
        <ex-code-editor v-model="code" :dark="dark" />
        <div class="name-back">{{ lastName }}</div>
      </div>
      <template #footer>
        <span>
          <el-button size="default" @click="cancel">取消</el-button>
          <el-button size="default" type="primary" @click="confirm">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from "vue";
import ExCodeEditor from "@exercise-form/components/code-editor";
import { darkKeys } from "@exercise-form/components/form-designer/src/form-designer";
import { EVENT_PARAMS_NAME } from "@exercise-form/core";

interface EventEditType {
  settingData: any;
  eventName?: string;
}

const props = withDefaults(defineProps<EventEditType>(), {
  eventName: ""
});

const EVENT_PARAMS_NAMEs = EVENT_PARAMS_NAME as { [key: string]: string };
const dark = inject(darkKeys);
const isShowEvent = ref(false);
const code = ref("");
const fnName = ref(
  `${props.eventName}(${EVENT_PARAMS_NAMEs[props.eventName]}){}`
);
const settingOptions = computed({
  get: () => props.settingData.options,
  set: (val) => val
});
const firstName = computed(() => {
  return fnName.value.slice(0, fnName.value.length - 1);
});
const lastName = computed(() => {
  return fnName.value.slice(-1);
});

const handleEventCode = () => {
  isShowEvent.value = true;
  code.value = settingOptions.value[props.eventName];
};

const confirm = () => {
  settingOptions.value[props.eventName] = code.value;
  cancel();
};

const cancel = () => {
  code.value = "";
  isShowEvent.value = false;
};
</script>
