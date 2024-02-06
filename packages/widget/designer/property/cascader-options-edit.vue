<template>
  <div class="ex-property-cascader" v-if="!optionsModel.showDataSource">
    <el-form-item label="选项签名">
      <el-input v-model="optionsModel.props!.label" />
    </el-form-item>
    <el-form-item label="选项值">
      <el-input v-model="optionsModel.props!.value" />
    </el-form-item>
    <el-form-item label="子节点属性名称">
      <el-input v-model="optionsModel.props!.children" />
    </el-form-item>
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
          :key="cascaderKey"
          draggable
          :props="options"
        >
          <template #default="{ node, data }">
            <div class="ex-property-col">
              <el-input
                class="ex-property-col_put"
                v-model="data[options.value]"
              />
              <el-input
                class="ex-property-col_put ex-mgl-10"
                v-model="data[options.label]"
              />
              <el-button
                @click.stop="handelAddChild(data)"
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
import { ref, computed, watch } from "vue";
import { onMessageWarning, getRandomNumber } from "@exercise-form/utils";
import { desPropertyProps } from "./property";
import type Node from "element-plus/es/components/tree/src/model/node";

type TreeData = { [key: string]: any };

const props = defineProps(desPropertyProps);

const visible = ref(false);
const isImport = ref(false);
const cascaderKey = ref(props.settingData.id);
const code = ref("");
const options = computed(() => {
  let { label, value, children } = props.optionsModel.props;
  return {
    label: label ? label : "label",
    value: value ? value : "value",
    children: children ? children : "children"
  };
});
const settingOptions = computed({
  get: () => props.optionsModel.options,
  set: (val) => val
});

watch(
  () => props.optionsModel?.props?.children,
  () => {
    cascaderKey.value = cascaderKey.value + getRandomNumber();
  }
);

const handleNodeClick = () => {
  console.log(settingOptions.value);
};

const getOptions = (value: string | number) => {
  let item: TreeData = {};
  item[options.value.label] = "new option";
  item[options.value.value] = value;
  item[options.value.children] = [];
  return item;
};

const handelAddChild = (data: TreeData) => {
  if (!data[options.value.children]) data[options.value.children] = [];
  let children = data[options.value.children];
  let value = data[options.value.value];
  let len = children.length + 1;
  let text = value + "-" + len;
  children.push(getOptions(text));
};

const handelAdd = () => {
  let len = settingOptions.value.length + 1;
  settingOptions.value.push(getOptions(len));
};

const handelDel = (node: Node, data: TreeData) => {
  const parent = node.parent;
  let parentChildren = parent.data[options.value.children] as TreeData[];
  const children = parentChildren || parent.data;
  const index = children.findIndex((d) => d.value === data.value);
  if (data.children?.length > 0) {
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
