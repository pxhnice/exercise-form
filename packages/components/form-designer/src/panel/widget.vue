<template>
  <div>
    <el-radio-group class="ex-radio-group" v-model="groupValue">
      <el-radio-button label="ZJ">组件库</el-radio-button>
      <el-radio-button v-if="optionsData?.templateButton" label="MB">
        模版
      </el-radio-button>
    </el-radio-group>
    <div class="ex-widget-container">
      <div class="ex-widget-container-box">
        <el-scrollbar class="ex-widget-box-scrollbar">
          <el-collapse v-if="groupValue == 'ZJ'" v-model="activeNames">
            <el-collapse-item title="容器组件" name="1">
              <draggable
                :group="group"
                class="ex-form-draggable"
                :list="containerList"
                item-key="id"
                :sort="false"
                :clone="handleClone"
              >
                <template #item="{ element }">
                  <div class="ex-drag-tainer">
                    <el-icon class="ex-mgr-10" :size="20">
                      <component :is="`ex-icon-${element.iconName}`" />
                    </el-icon>
                    {{ element.name }}
                  </div>
                </template>
              </draggable>
            </el-collapse-item>
            <el-collapse-item title="基本组件" name="2">
              <draggable
                :group="group"
                class="ex-form-draggable"
                :list="fieldsList"
                item-key="id"
                :sort="false"
                :clone="handleClone"
              >
                <template #item="{ element }">
                  <div class="ex-drag-tainer">
                    <el-icon class="ex-mgr-10" :size="20">
                      <component :is="`ex-icon-${element.iconName}`" />
                    </el-icon>
                    {{ element.name }}
                  </div>
                </template>
              </draggable>
            </el-collapse-item>
            <el-collapse-item title="自定义组件" name="3">
              <draggable
                :group="group"
                class="ex-form-draggable"
                :list="customsList"
                item-key="id"
                :sort="false"
                :clone="handleClone"
              >
                <template #item="{ element }">
                  <div class="ex-drag-tainer">
                    <el-icon class="ex-mgr-10" :size="20">
                      <component :is="`ex-icon-${element.iconName}`" />
                    </el-icon>
                    {{ element.name }}
                  </div>
                </template>
              </draggable>
            </el-collapse-item>
          </el-collapse>
          <div v-else>
            <el-card
              v-for="(temp, index) in templateList"
              :key="index"
              class="ex-widget-temp ex-mgt-10"
              shadow="never"
            >
              <el-tooltip
                placement="right"
                :offset="30"
                :effect="dark ? 'dark' : 'light'"
              >
                <template #content>
                  <div style="width: 500px">
                    <img style="width: 100%" :src="temp.img" />
                  </div>
                </template>
                <img style="width: 100%" :src="temp.img" />
              </el-tooltip>
              <div class="ex-temp-btn ex-mgt-10">
                <div style="font-weight: bold">
                  #{{ index + 1 }}{{ temp.name }}
                </div>
                <el-button
                  @click="handleLoadTemplate(temp.widgetList)"
                  type="primary"
                  link
                  >加载此模板</el-button
                >
              </div>
            </el-card>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from "vue";
import { ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
import { containers, baseFields, customs } from "@exercise-form/constants";
import type { DesWidgetListType } from "@exercise-form/constants";
import { optionsKeys, bannedWidgetKeys, darkKeys } from "../form-designer";
import { desPanelProps } from "./panel";

const props = defineProps(desPanelProps);

const group = {
  name: "componentsGroup",
  pull: "clone",
  put: false
};
const optionsData = inject(optionsKeys);
const bannedWidgets = inject(bannedWidgetKeys);
const dark = inject(darkKeys);
const groupValue = ref("ZJ");
const activeNames = ref(["1", "2", "3"]);
const containerList = computed(() => {
  let list = containers.filter((item) => item.iconName);
  return list.filter((item) => !bannedWidgets?.value.includes(item.type));
});
const fieldsList = computed(() =>
  baseFields.filter((item) => !bannedWidgets?.value.includes(item.type))
);
const customsList = computed(() =>
  customs.filter((item) => !bannedWidgets?.value.includes(item.type))
);

const handleClone = (target: any) => {
  return props.designer.cloneWidget(target);
};
const handleLoadTemplate = (list: DesWidgetListType) => {
  ElMessageBox.alert(
    "是否加载此模板？加载后会覆盖当前表单，你可以使用“撤销”功能恢复。",
    "提示",
    {
      showCancelButton: true,
      callback: (action: Action) => {
        if (action == "confirm") {
          props.designer.loadWidget(list);
        }
      }
    }
  );
};
</script>
