<template>
  <div class="ex-property-options">
    <el-divider> 选项设置 </el-divider>
    <el-form-item label-width="0">
      <el-radio-group
        v-if="settingData.type == 'radio'"
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
              <el-radio style="margin: 0" title="默认值" :label="element.value">
                <template></template>
              </el-radio>
              <el-input class="options-put" v-model="element.value" />
              <el-input class="options-put" v-model="element.label" />
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
      </el-radio-group>
      <el-checkbox-group
        v-if="settingData.type == 'checkbox'"
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
                :label="element.value"
              >
                <template></template>
              </el-checkbox>
              <el-input class="options-put" v-model="element.value" />
              <el-input class="options-put" v-model="element.label" />
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
      </el-checkbox-group>
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
