<template>
  <div>
    <el-form-item label="选项卡设置" />
    <el-form-item label-width="0">
      <draggable
        tag="ul"
        class="row"
        :list="children"
        handle=".pane-mover"
        item-key="id"
      >
        <template #item="{ element, index }">
          <li class="col">
            <el-checkbox
              v-model="element.options.active"
              disabled
              label="激活"
              size="small"
            />
            <el-input class="put" v-model="element.options.label" />
            <ex-svg-icon class="ft-20 pane-mover ft" name="drag" />
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

<style lang="scss" scoped>
.row {
  padding: 0px;
  margin-bottom: 10px;
  .col {
    display: flex;
    align-items: center;
    list-style: none;
    text-decoration: none;
    .put,
    .btn {
      margin-left: 10px;
    }
    .ft {
      font-size: 32px;
      cursor: move;
    }
  }
}
</style>
