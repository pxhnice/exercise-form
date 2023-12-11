<template>
  <div>
    <el-radio-group class="ex-radio-group" v-model="groupValue">
      <el-radio-button style="flex: 1" label="ZJ">组件库</el-radio-button>
      <el-radio-button style="flex: 1" label="MB">模版</el-radio-button>
    </el-radio-group>
    <div class="ex-widget-container">
      <div class="ex-widget-container-box">
        <el-scrollbar class="ex-widget-box-scrollbar">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="容器组件" name="1">
              <draggable
                :group="group"
                class="ex-form-draggable"
                :list="parentContainer"
                item-key="id"
                :sort="false"
                :clone="handleClone"
              >
                <template #item="{ element }">
                  <div class="ex-drag-tainer">
                    <ex-svg-icon
                      class="ex-icon-ft-20 ex-mgr-10"
                      :name="element.iconName"
                    />
                    {{ element.name }}
                  </div>
                </template>
              </draggable>
            </el-collapse-item>
            <el-collapse-item title="基本组件" name="2">
              <draggable
                :group="group"
                class="ex-form-draggable"
                :list="baseFields"
                item-key="id"
                :sort="false"
                :clone="handleClone"
              >
                <template #item="{ element }">
                  <div class="ex-drag-tainer">
                    <ex-svg-icon
                      class="ex-icon-ft-20 ex-mgr-10"
                      :name="element.iconName"
                    />
                    {{ element.name }}
                  </div>
                </template>
              </draggable>
            </el-collapse-item>
            <el-collapse-item title="自定义组件" name="3">
              <draggable
                :group="group"
                class="ex-form-draggable"
                :list="customs"
                item-key="id"
                :sort="false"
                :clone="handleClone"
              >
                <template #item="{ element }">
                  <div class="ex-drag-tainer">
                    <ex-svg-icon
                      class="ex-icon-ft-20 ex-mgr-10"
                      :name="element.iconName"
                    />
                    {{ element.name }}
                  </div>
                </template>
              </draggable>
            </el-collapse-item>
          </el-collapse>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { containers, baseFields, customs } from "@exercise-form/constants";
import { desPanelProps } from "./panel";
import ".././../style/index.scss";

const props = defineProps(desPanelProps);

const groupValue = ref("ZJ");
const activeNames = ref(["1", "2", "3"]);
const group = ref({
  name: "componentsGroup",
  pull: "clone",
  put: false
});
const parentContainer = computed(() =>
  containers.filter((item) => item.iconName)
);

const handleClone = (target: any) => {
  return props.designer.cloneWidget(target);
};
</script>
