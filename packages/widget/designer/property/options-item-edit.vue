<template>
  <div class="ex-property-options" v-if="!optionsModel.showDataSource">
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
          :list="optionsModel.optionsItem"
          handle=".pane-mover"
          item-key="id"
        >
          <template #item="{ element, index }">
            <li class="options-col">
              <el-radio
                style="margin: 0"
                title="默认值"
                :label="element[value]"
              >
                <template></template>
              </el-radio>
              <el-input class="options-put" v-model="element[value]" />
              <el-input class="options-put" v-model="element[label]" />
              <el-icon class="pane-mover" :size="22">
                <ex-icon-drag />
              </el-icon>
              <el-button
                @click="handleDel(index)"
                class="options-btn"
                icon="Minus"
                type="danger"
                plain
                circle
              />
            </li>
          </template>
        </draggable>
        <el-button @click="handleAdd" class="options-btn" type="primary" link>
          添加选项
        </el-button>
        <el-button @click="handleReset" class="options-btn" type="primary" link>
          重置选中项
        </el-button>
        <el-button
          @click="handleImport"
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
          :list="optionsModel.optionsItem"
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
                @click="handleDel(index)"
                class="options-btn"
                icon="Minus"
                type="danger"
                plain
                circle
              />
            </li>
          </template>
        </draggable>
        <el-button @click="handleAdd" class="options-btn" type="primary" link>
          添加选项
        </el-button>
        <el-button @click="handleReset" class="options-btn" type="primary" link>
          重置选中项
        </el-button>
        <el-button
          @click="handleImport"
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
      title="选项数据编辑"
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
const selectWidget = props.designer.selectWidget;
const isShowData = ref(false);
const codeValue = ref();
const isRadioType = computed(() => {
  let { type, options } = props.settingData;
  return (!options.multiple && type == "select") || type == "radio";
});
const isMultipleType = computed(() => {
  let { type, options } = props.settingData;
  return (options.multiple && type == "select") || type == "checkbox";
});

watch(
  () => props.optionsModel.multiple,
  () => {
    handleReset();
  }
);

const { label, value } = useOptions(props.settingData);

const handleAdd = () => {
  let { optionsItem } = props.optionsModel;
  let len = optionsItem.length;
  let item: { [key: string]: any } = {};
  item[value.value] = len + 1;
  item[label.value] = "new option";
  selectWidget.value.options.optionsItem.push(item);
};

const handleDel = (index: number) => {
  let { optionsItem } = props.optionsModel;
  let len = optionsItem.length;
  if (len == 1) {
    onMessageWarning("至少保留一个选项卡");
    return;
  }
  selectWidget.value.options.optionsItem.splice(index, 1);
};

const handleReset = () => {
  if (isRadioType.value) {
    selectWidget.value.options.modelDefaultValue = null;
  } else {
    selectWidget.value.options.modelDefaultValue = [];
  }
};

const handleImport = () => {
  codeValue.value = JSON.stringify(props.optionsModel, null, 2);
  isShowData.value = true;
};

const confirm = () => {
  try {
    selectWidget.value.options.optionsItem = JSON.parse(codeValue.value);
    isShowData.value = false;
  } catch (error) {
    onMessageError(`错误的选项数据:${error}`);
  }
};
</script>
