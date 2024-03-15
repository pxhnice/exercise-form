<template>
  <div class="ex-source ex-upload">
    <ul v-if="isShow" class="ex-source-list">
      <li v-for="(item, index) of formConfig.dataSources" :key="index">
        <div class="ex-source-box">
          <div class="ex-source-list_title">{{ item.name }}</div>
          <div>
            <el-button
              class="ex-source-list_edit"
              type="primary"
              @click="handleEdit(item)"
              icon="Edit"
              size="small"
              circle
            />
            <el-button
              class="ex-source-list_delete"
              type="danger"
              @click="handleDelete(index)"
              icon="Delete"
              size="small"
              circle
            />
          </div>
        </div>
        <div class="ex-source-list-box">
          <div class="ex-data-source_icon">
            <el-icon><Platform /></el-icon>
          </div>
          <el-divider direction="vertical" />
          <!-- <el-tooltip
            effect="dark"
            :content="item.requestUrl"
            placement="bottom"
          > -->
          <div class="ex-source-list_content">{{ item.requestUrl }}</div>
          <!-- </el-tooltip> -->
        </div>
      </li>
    </ul>
    <el-empty v-else description="暂无数据源" />
    <el-button-group class="ex-source-operation">
      <el-button type="primary" @click="handleOpenAdd" plain icon="Plus">
        新增数据源
      </el-button>
      <el-button
        type="primary"
        @click="handleOpenImport"
        plain
        icon="BottomLeft"
      />
      <el-button
        type="primary"
        @click="handleOpenExport"
        plain
        icon="TopRight"
      />
    </el-button-group>
    <ex-source-add ref="exSourceAddRef" />
    <ex-source-import ref="exSourceImportRef" />
    <ex-source-export ref="exSourceExportRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ElMessageBox } from "element-plus";
import { DesFormSource } from "@exercise-form/core";
import ExSourceAdd from "./add.vue";
import ExSourceImport from "./import.vue";
import ExSourceExport from "./export.vue";
import { desSourceProps } from "./source";

const props = defineProps(desSourceProps);
const dataSources = props.formConfig.dataSources;
const exSourceAddRef = ref();
const exSourceImportRef = ref();
const exSourceExportRef = ref();
const isShow = computed(
  () => props.formConfig.dataSources && props.formConfig.dataSources.length > 0
);

const handleEdit = (item: DesFormSource) => {
  exSourceAddRef.value!.handleOpen({ sources: item, dataSources });
};

const handleDelete = (index: number) => {
  ElMessageBox.confirm("确定删除该数据源?", "提示").then(() => {
    dataSources.splice(index, 1);
  });
};

const handleOpenAdd = () => {
  exSourceAddRef.value!.handleOpen({ dataSources });
};
const handleOpenImport = () => {
  exSourceImportRef.value!.handleOpen(dataSources);
};
const handleOpenExport = () => {
  exSourceExportRef.value!.handleOpen(dataSources);
};
</script>
