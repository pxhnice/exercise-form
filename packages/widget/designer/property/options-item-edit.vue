<template>
  <div>
    <el-divider> 选项设置 </el-divider>
    <el-form-item label-width="0">
      <draggable
        tag="ul"
        class="row"
        :list="optionsItem"
        handle=".pane-mover"
        item-key="id"
      >
        <template #item="{ element, index }">
          <li class="col">
            <el-input class="put" v-model="element.value" />
            <el-input class="put" v-model="element.label" />
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

<style lang="scss" scoped>
.row {
  padding: 0px;
  margin-bottom: 10px;
  .col {
    display: flex;
    align-items: center;
    list-style: none;
    text-decoration: none;
    margin-bottom: 10px;
    .put {
      width: 85px;
    }
    .put,
    .btn {
      margin-left: 5px;
    }
    .ft {
      font-size: 22px;
      cursor: move;
    }
  }
}
</style>
