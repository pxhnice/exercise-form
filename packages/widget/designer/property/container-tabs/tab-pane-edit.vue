<template>
  <div>
    <el-form-item label="选项卡设置" />
    <el-form-item label-width="0">
      <el-radio-group v-model="optionsModel.modelDefaultValue">
        <draggable
          tag="ul"
          class="ex-property-row"
          :list="children"
          handle=".pane-mover"
          item-key="id"
        >
          <template #item="{ element, index }">
            <li class="ex-property-col ex-mgb-10">
              <el-radio
                style="margin: 0"
                title="默认激活"
                :label="element.options.name"
              >
                <template> </template>
              </el-radio>
              <el-input
                class="ex-property-col_put"
                v-model="element.options.name"
              />
              <el-input
                class="ex-property-col_put ex-mgl-10"
                v-model="element.options.label"
              />
              {{ element.options }}
              <el-icon class="pane-mover" :size="22">
                <ex-icon-drag />
              </el-icon>
              <el-button
                @click="handleDel(index)"
                class="btn"
                icon="Minus"
                type="danger"
                plain
                circle
              />
            </li>
          </template>
        </draggable>
      </el-radio-group>
      <el-button @click="handleAdd" class="btn" type="primary" link>
        添加选项卡
      </el-button>
      <el-button @click="handleReset" class="options-btn" type="primary" link>
        重置激活项
      </el-button>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { onMessageWarning } from "@exercise-form/utils";

import { desPropertyProps } from "../property";

const props = defineProps(desPropertyProps);

const selectWidget = props.designer.selectWidget;
const children = computed({
  get: () => props.settingData.children ?? [],
  set: (val) => val
});

const handleAdd = () => {
  props.designer.copyContainerWidget(props.settingData);
};

const handleDel = (index: number) => {
  let len = children.value.length;
  if (len == 1) {
    onMessageWarning("至少保留一个选项卡");
    return;
  }
  let item = children.value[index];
  let { name } = item.options;
  children.value.splice(index, 1);
  if (name === props.optionsModel.modelDefaultValue) {
    handleReset();
  }
};

const handleReset = () => {
  selectWidget.value.options.modelDefaultValue = null;
};
</script>
