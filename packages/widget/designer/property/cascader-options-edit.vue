<template>
  <div class="ex-property-cascader">
    <el-form-item label="级联选项设置">
      <el-button @click="visible = true" type="primary" icon="Edit" round>
        选项设置
      </el-button>
    </el-form-item>
    <el-dialog v-model="visible" title="级联选项设置" width="600">
      <el-alert
        show-icon
        :closable="false"
        title="删除选项时，因将value作为id使用，在编辑时请确保value值的唯一性"
        type="info"
      />
      <el-scrollbar height="400px">
        <el-tree
          :data="optionsModel.options"
          @node-click="handleNodeClick"
          draggable
        >
          <template #default="{ node, data }">
            <div class="ex-property-col">
              <el-input class="ex-property-col_put" v-model="data.value" />
              <el-input
                class="ex-property-col_put ex-mgl-10"
                v-model="data.label"
              />
              <el-button
                @click.stop="handelAddChild(node)"
                class="ex-mgl-10"
                icon="Plus"
                type="primary"
                plain
                circle
              />
              <el-button
                @click.stop="handelDel(node, data)"
                class="ex-mgl-10"
                icon="Minus"
                type="danger"
                plain
                circle
              />
            </div>
          </template>
        </el-tree>
      </el-scrollbar>
      <template #footer>
        <span>
          <el-button @click="handelAdd" size="default" type="primary">
            添加选项
          </el-button>
          <el-button @click="openImport" size="default" type="primary">
            导入选项
          </el-button>
          <el-button @click="visible = false" size="default">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="isImport"
      width="600"
      title="组件事件编辑"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <ex-code-editor v-model="code" :height="500" lang="json" />
      <template #footer>
        <span>
          <el-button @click="confirm" size="default" type="primary">
            确认
          </el-button>
          <el-button @click="isImport = false" size="default">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { onMessageWarning } from "@exercise-form/utils";
import { desPropertyProps } from "./property";

const props = defineProps(desPropertyProps);

const visible = ref(false);
const isImport = ref(false);
const code = ref("");

const settingOptions = computed({
  get: () => props.optionsModel.options,
  set: (val) => val
});

const handleNodeClick = () => {
  console.log(settingOptions.value);
};

const handelAddChild = (node: any) => {
  let { value, children } = node.data;
  let len = children.length + 1;
  let text = value + "-" + len;
  children.push({ value: text, label: "new option" + text, children: [] });
};

const handelAdd = () => {
  let len = settingOptions.value.length + 1;
  settingOptions.value.push({
    value: len,
    label: "new option",
    children: []
  });
};

const handelDel = (node: any, data: any) => {
  const parent = node.parent;
  const children = parent.data.children || parent.data;
  const index = children.findIndex((d: any) => d.value === data.value);
  if (data.children.length > 0) {
    onMessageWarning("该节点还存在子节点，无法删除");
    return;
  }
  children.splice(index, 1);
};

const openImport = () => {
  const jsonString = JSON.stringify(settingOptions.value, null, 4);
  code.value = jsonString;
  isImport.value = true;
};

const confirm = () => {
  let parseArr = JSON.parse(code.value);
  settingOptions.value = parseArr;
  isImport.value = false;
};
</script>
