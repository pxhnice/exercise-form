<template>
  <div>
    <el-form-item label="选项卡设置" />
    <el-form-item label-width="0">
      <draggable
        tag="ul"
        class="ex-property-row"
        :list="children"
        handle=".pane-mover"
        item-key="id"
      >
        <template #item="{ element, index }">
          <li class="ex-property-col ex-mgb-10">
            <el-checkbox
              v-model="element.options.active"
              disabled
              label="激活"
              size="small"
            />
            <el-input
              class="ex-property-tab_put ex-mgl-10"
              v-model="element.options.label"
            />
            <el-icon class="pane-mover" :size="22">
              <ex-icon-drag />
            </el-icon>
            <el-button
              @click="handelDel(index)"
              class="btn"
              icon="Minus"
              type="danger"
              plain
              circle
            />
          </li>
        </template>
      </draggable>
      <el-button @click="handelAdd" class="btn" type="primary" link>
        添加选项卡
      </el-button>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { onMessageWarning } from "@exercise-form/utils";
import draggable from "vuedraggable";

import { desPropertyProps } from "../property";

const props = defineProps(desPropertyProps);

const children = computed({
  get: () => props.settingData.children,
  set: (val) => val
});

const handelAdd = () => {
  props.designer.copyContainerWidget(props.settingData);
};

const handelDel = (index: number) => {
  let len = children.value.length;
  if (len == 1) {
    onMessageWarning("至少保留一个选项卡");
    return;
  }
  children.value.splice(index, 1);
};
</script>
