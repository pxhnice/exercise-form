<template>
  <div class="ex-property-options">
    <el-divider> 选项设置 </el-divider>
    <el-form-item label-width="0">
      <draggable
        tag="ul"
        class="options-row"
        :list="optionsItem"
        handle=".pane-mover"
        item-key="id"
      >
        <template #item="{ element, index }">
          <li class="options-col">
            <el-input class="options-put" v-model="element.value" />
            <el-input class="options-put" v-model="element.label" />
            <ex-svg-icon class="ex-property_ft22 pane-mover" name="drag" />
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
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { onMessageWarning } from "@exercise-form/utils";
import { desPropertyProps } from "./property";

const props = defineProps(desPropertyProps);

const optionsItem = computed({
  get: () => props.optionsModel.optionsItem,
  set: (val) => val
});

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
</script>
