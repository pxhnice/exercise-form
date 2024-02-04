<template>
  <div class="ex-property-options">
    <el-form-item label="选项签名">
      <el-input v-model="optionsModel.optionsLabel" />
    </el-form-item>
    <el-form-item label="选项值">
      <el-input v-model="optionsModel.optionsValue" />
    </el-form-item>
    <el-divider> 选项设置 </el-divider>
    <el-form-item label-width="0">
      <el-radio-group
        v-if="isRadioType"
        v-model="optionsModel.modelDefaultValue"
      >
        <draggable
          tag="ul"
          class="options-row"
          :list="optionsItem"
          handle=".pane-mover"
          item-key="id"
        >
          <template #item="{ element, index }">
            <li class="options-col">
              <el-radio
                style="margin: 0"
                title="默认值"
                :label="element[optionsModel.value]"
              >
                <template></template>
              </el-radio>
              <el-input class="options-put" v-model="element[value]" />
              <el-input class="options-put" v-model="element[label]" />
              <el-icon class="pane-mover" :size="22">
                <ex-icon-drag />
              </el-icon>
              <el-button
                @click="handelDel(index)"
                class="options-btn"
                icon="Minus"
                type="danger"
                plain
                circle
              />
            </li>
          </template>
        </draggable>
        <el-button @click="handelAdd" class="options-btn" type="primary" link>
          添加选项
        </el-button>
        <el-button @click="handelReset" class="options-btn" type="primary" link>
          重置选中项
        </el-button>
        <el-button
          @click="handelImport"
          class="options-btn"
          type="primary"
          link
        >
          导入选项
        </el-button>
      </el-radio-group>
      <el-checkbox-group
        v-if="isMultipleType"
        v-model="optionsModel.modelDefaultValue"
      >
        <draggable
          tag="ul"
          class="options-row"
          :list="optionsItem"
          handle=".pane-mover"
          item-key="id"
        >
          <template #item="{ element, index }">
            <li class="options-col">
              <el-checkbox
                style="margin: 0"
                title="默认值"
                :label="element[value]"
              >
                <template></template>
              </el-checkbox>
              <el-input class="options-put" v-model="element[value]" />
              <el-input class="options-put" v-model="element[label]" />
              <el-icon class="pane-mover" :size="22">
                <ex-icon-drag />
              </el-icon>
              <el-button
                @click="handelDel(index)"
                class="options-btn"
                icon="Minus"
                type="danger"
                plain
                circle
              />
            </li>
          </template>
        </draggable>
        <el-button @click="handelAdd" class="options-btn" type="primary" link>
          添加选项
        </el-button>
        <el-button @click="handelReset" class="options-btn" type="primary" link>
          重置选中项
        </el-button>
        <el-button
          @click="handelImport"
          class="options-btn"
          type="primary"
          link
        >
          导入选项
        </el-button>
      </el-checkbox-group>
    </el-form-item>
    <el-dialog
      width="800"
      v-model="isShowData"
      v-bind="dialogOptions"
      title="表格JSON数据编辑"
      @close="isShowData = false"
    >
      <ex-code-editor v-model="codeValue" lang="json" :dark="dark" />
      <template #footer>
        <div style="display: flex; justify-content: center">
          <el-button type="primary" size="default" @click="confirm">
            确认
          </el-button>
          <el-button size="default" @click="isShowData = false">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject } from "vue";
import { onMessageWarning, onMessageError } from "@exercise-form/utils";
import { desPropertyProps } from "./property";
import { darkKeys } from "@exercise-form/components/form-designer/src/form-designer";
import { useOptions } from "@exercise-form/hooks";

const props = defineProps(desPropertyProps);

const dialogOptions = {
  draggable: true,
  destroyOnClose: true,
  closeOnClickModal: false
};
const dark = inject(darkKeys);
const isShowData = ref(false);
const codeValue = ref();
const optionsModel = props.optionsModel;
const optionsItem = computed({
  get: () => props.optionsModel.optionsItem,
  set: (val) => val
});
const isRadioType = computed(() => {
  let { type, options } = props.settingData;
  let { multiple } = options;
  return (!multiple && type == "select") || type == "radio";
});

const isMultipleType = computed(() => {
  let { type, options } = props.settingData;
  let { multiple } = options;
  return (multiple && type == "select") || type == "checkbox";
});

watch(
  () => props.optionsModel.multiple,
  () => {
    handelReset();
  }
);

const { label, value } = useOptions(props.settingData);

const handelAdd = () => {
  let len = optionsItem.value.length;
  optionsItem.value.push({ value: len + 1, label: "new option" });
};

const handelDel = (index: number) => {
  let len = optionsItem.value.length;
  if (len == 1) {
    onMessageWarning("至少保留一个选项卡");
    return;
  }
  optionsItem.value.splice(index, 1);
};

const handelReset = () => {
  if (isRadioType.value) {
    optionsModel.modelDefaultValue = "";
  } else {
    optionsModel.modelDefaultValue = [];
  }
};

const handelImport = () => {
  codeValue.value = JSON.stringify(optionsItem.value, null, 2);
  isShowData.value = true;
};

const confirm = () => {
  try {
    optionsModel["optionsItem"] = JSON.parse(codeValue.value);
    isShowData.value = false;
  } catch (error) {
    onMessageError(`错误的选项数据:${error}`);
  }
};
</script>
