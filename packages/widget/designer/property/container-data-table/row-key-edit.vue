<template>
  <div>
    <el-form-item label="行数据Key">
      <el-input v-model="optionsModel.rowKey" />
    </el-form-item>
    <el-form-item label="宽度(px/%)">
      <el-input v-model="optionsModel.width" />
    </el-form-item>
    <el-form-item label="高度(px/%)">
      <el-input v-model="optionsModel.height" />
    </el-form-item>
    <el-form-item label="显示表头">
      <el-switch v-model="optionsModel.showHeader" />
    </el-form-item>
    <el-form-item label="显示序号">
      <el-switch v-model="optionsModel.showIndex" />
    </el-form-item>
    <el-form-item label="显示选框">
      <el-switch v-model="optionsModel.showCheckBox" />
    </el-form-item>
    <el-form-item label="列宽度自撑开">
      <el-switch v-model="optionsModel.fit" />
    </el-form-item>
    <el-form-item label="显示斑马纹">
      <el-switch v-model="optionsModel.stripe" />
    </el-form-item>
    <el-form-item label="高亮当前行">
      <el-switch v-model="optionsModel.highlightCurrentRow" />
    </el-form-item>
    <el-form-item label="表格列编辑">
      <el-button @click="isShowRow = true" type="primary" icon="Edit" round>
        编辑
      </el-button>
    </el-form-item>
    <el-form-item label="表格数据编辑">
      <el-button
        @click="isShowDataTable = true"
        type="primary"
        icon="Edit"
        round
      >
        编辑
      </el-button>
    </el-form-item>
    <el-form-item label="显示操作列">
      <el-switch v-model="optionsModel.showOperation" />
    </el-form-item>
    <el-form-item label="操作按钮编辑">
      <el-button
        @click="isShowOperation = true"
        type="primary"
        icon="Edit"
        round
      >
        编辑
      </el-button>
    </el-form-item>
    <el-dialog
      class="ex-data-table"
      v-model="isShowRow"
      width="1300"
      v-bind="dialogOptions"
      title="表格列编辑"
      @close="cancel"
      @opened="opened"
    >
      <el-table
        ref="dataTableRef"
        class="draggable"
        :data="tableColumns"
        :key="dataTableKey"
        default-expand-all
        row-key="columnsId"
        border
        style="width: 100%; height: 500px"
      >
        <el-table-column type="index" width="50" align="center" />
        <el-table-column min-width="120" align="left">
          <template #default="scope">
            <span v-if="scope.row.headerFlag">|---</span>
            <span v-else>数据列</span>
          </template>
        </el-table-column>
        <el-table-column width="50" align="center">
          <el-icon class="pane-mover" :size="22">
            <ex-icon-drag />
          </el-icon>
        </el-table-column>
        <el-table-column width="120" label="字段名称" align="center">
          <template #default="scope">
            <span v-if="scope.row.children">|---</span>
            <span v-else><el-input v-model="scope.row.prop" /></span>
          </template>
        </el-table-column>
        <el-table-column width="120" label="显示名称" align="center">
          <template #default="scope">
            <el-input v-model="scope.row.label" />
          </template>
        </el-table-column>
        <el-table-column width="80" label="列宽(px)" align="center">
          <template #default="scope">
            <el-input v-if="!scope.row.children" v-model="scope.row.minWidth" />
          </template>
        </el-table-column>
        <el-table-column width="70" label="是否显示" align="center">
          <template #default="scope">
            <el-switch v-if="!scope.row.children" v-model="scope.row.show" />
          </template>
        </el-table-column>
        <el-table-column width="70" label="是否排序" align="center">
          <template #default="scope">
            <el-switch
              v-if="!scope.row.children"
              v-model="scope.row.sortable"
            />
          </template>
        </el-table-column>
        <el-table-column width="100" label="是否固定" align="center">
          <template #default="scope">
            <el-select v-model="scope.row.fixed">
              <el-option label="left" value="left" />
              <el-option label="false" value="" />
              <el-option label="right" value="right" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column width="100" label="对齐方式" align="center">
          <template #default="scope">
            <el-select v-model="scope.row.align">
              <el-option label="left" value="left" />
              <el-option label="center" value="center " />
              <el-option label="right" value="right" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column width="180" label="格式化" align="center">
          <template #default="scope">
            <el-select v-if="!scope.row.children" v-model="scope.row.format">
              <el-option label="left" value="left" />
              <el-option label="center" value="center " />
              <el-option label="right" value="right" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column width="70" label="渲染函数" align="center">
          <template #default="scope">
            <el-button
              class="ex-mgl-10"
              @click="handleRender(scope.row)"
              icon="Edit"
              type="primary"
              plain
              circle
            />
          </template>
        </el-table-column>
        <el-table-column width="80" label="操作" align="center">
          <template #default="scope">
            <el-tooltip effect="light" placement="bottom" trigger="hover">
              <el-button icon="Plus" type="primary" plain circle />
              <template #content>
                <div class="ex-data-table-btn">
                  <el-button @click="insertCol(scope.row)" link>
                    插入数据列
                  </el-button>
                  <el-button
                    @click="insertLowerCol(scope.row)"
                    :disabled="isInsertLowerCol(scope.row)"
                    link
                  >
                    插入下级数据列
                  </el-button>
                  <el-button @click="insertHeader(scope.row)" link>
                    插入表头
                  </el-button>
                  <el-button
                    @click="insertLowerHeader(scope.row)"
                    :disabled="isInsertLowerHeader(scope.row)"
                    link
                  >
                    插入下级表头
                  </el-button>
                </div>
              </template>
            </el-tooltip>
            <el-button
              @click="handleDeleteRow(scope.$index)"
              icon="Minus"
              type="danger"
              plain
              circle
            />
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <div style="display: flex; justify-content: center">
          <el-button size="default" @click="cancel">关闭</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="isShowDataTable"
      v-bind="dialogOptions"
      title="表格数据编辑"
      @close="cancel"
    >
      <template #footer>
        <span>
          <el-button size="default" @click="cancel">取消</el-button>
          <el-button size="default" type="primary" @click="confirm">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      width="1200"
      v-model="isShowOperation"
      v-bind="dialogOptions"
      title="操作按钮编辑"
      @close="cancel"
    >
      <el-form v-model="optionsModel">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="列标题">
              <el-input v-model="optionsModel.operationLabel" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="列宽度(px)">
              <el-input-number v-model="optionsModel.operationWidth" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="对齐方式">
              <el-select v-model="optionsModel.operationAlign">
                <el-option label="left" value="left" />
                <el-option label="center" value="center " />
                <el-option label="right" value="right" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="固定方式">
              <el-select v-model="optionsModel.operationFixed">
                <el-option label="left" value="left" />
                <el-option label="false" value="" />
                <el-option label="right" value="right" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left">操作按钮设置</el-divider>
        <div v-for="(btn, index) of optionsModel.operationButtons" :key="index">
          <el-row :gutter="10">
            <el-col :span="1">
              <el-icon class="pane-mover" :size="30">
                <ex-icon-drag />
              </el-icon>
            </el-col>
            <el-col :span="3">
              <el-form-item label="名称" required>
                <el-input v-model="btn.name" />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="文字">
                <el-input v-model="btn.label" />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="类型">
                <el-select v-model="btn.type">
                  <el-option label="left" value="left" />
                  <el-option label="center" value="center " />
                  <el-option label="right" value="right" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="大小">
                <el-select v-model="btn.size">
                  <el-option value="large" label="large" />
                  <el-option value="default" label="default" />
                  <el-option value="small" label="small" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="圆角">
                <el-switch v-model="btn.round" />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="圆形">
                <el-switch v-model="btn.circle" />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="禁用">
                <el-switch v-model="btn.disabled" />
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button icon="Delete" type="danger" plain circle />
            </el-col>
          </el-row>
        </div>
        <el-button type="primary" icon="Plus">添加按钮</el-button>
      </el-form>
      <template #footer>
        <span>
          <el-button size="default" @click="cancel">取消</el-button>
          <el-button size="default" type="primary" @click="confirm">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { desPropertyProps } from "../property";
import { onMessageWarning, getRandomNumber } from "@exercise-form/utils";
import Sortable from "sortablejs";

const props = defineProps(desPropertyProps);

// TODO:数据类型待处理
const tableColumns = props.optionsModel.tableColumns as [];
const dataTableKey = ref("dataTable");
const dataTableRef = ref();
const isShowRow = ref(false);
const isShowDataTable = ref(false);
const isShowOperation = ref(false);
const dialogOptions = {
  draggable: true,
  destroyOnClose: true,
  closeOnClickModal: false
};

const opened = () => {
  drag();
};

const confirm = () => {
  isShowRow.value = false;
};

const cancel = () => {
  isShowRow.value = false;
};

const drag = () => {
  const tbody = document.querySelector(
    ".draggable .el-table__body-wrapper tbody"
  ) as HTMLElement;
  if (tbody) {
    Sortable.create(tbody, {
      draggable: ".draggable .el-table__row",
      handle: ".pane-mover",
      onEnd({ newIndex, oldIndex }) {
        if (typeof newIndex === "number" && typeof oldIndex === "number") {
          let flatArr: any = flatColumn(tableColumns);
          let flatRow = flatArr[oldIndex];
          let targetRow = flatArr[newIndex];
          handleDragEvent(flatRow.columnsId, targetRow.columnsId, tableColumns);
          dataTableKey.value = dataTableKey.value + Math.random();
          nextTick(() => {
            drag();
          });
        }
      }
    });
  }
};

const getIds = (list: []) => {
  let ids: Array<number> = [];
  list.forEach((item: any) => {
    ids.push(item.columnsId);
  });
  return ids;
};

const handleDragEvent = (id: number, targetId: number, list: []) => {
  for (let index = 0; index < list.length; index++) {
    let item: any = list[index];
    if (item.children) handleDragEvent(id, targetId, item.children);
    if (id == item.columnsId) {
      let ids = getIds(list);
      let sub = ids.indexOf(targetId);
      if (sub != -1) {
        let row = list.splice(index, 1)[0];
        list.splice(sub, 0, row);
        return;
      } else {
        onMessageWarning("只能在同级别节点之间进行拖拽排序！");
      }
    }
  }
};

const isInsertLowerCol = (row: any) => {
  return !row.children;
};

const isInsertLowerHeader = (row: any) => {
  return !row.headerFlag;
};

const flatColumn = (columns: any, flatArr = []) => {
  columns.forEach((col: any) => {
    flatArr.push(col as never);
    if (col.children?.length) {
      flatArr.push(...flatColumn(col.children));
    }
  });
  return flatArr;
};

const insert = (id: number, data: any, list: any, level = false) => {
  list.forEach((item: any, index: number) => {
    if (item.children) insert(id, data, item.children);
    if (id == item.columnsId) {
      if (level) {
        if (!item.children) item.children = [];
        let len = item.children.length;
        len > 0
          ? item.children.splice(index + 1, 0, data)
          : item.children.push(data);
      } else {
        list.splice(index + 1, 0, data);
      }
    }
  });
};

const getColData = () => {
  return {
    columnsId: getRandomNumber(),
    fixed: "",
    label: "",
    minWidth: "",
    prop: ""
  };
};

const getHeaderData = () => {
  return {
    columnsId: getRandomNumber(),
    children: [],
    headerFlag: true,
    label: "表头",
    prop: "~"
  };
};

const insertCol = (row: any) => {
  insert(row.columnsId, getColData(), tableColumns);
};

const insertLowerCol = (row: any) => {
  insert(row.columnsId, getColData(), tableColumns, true);
};

const insertHeader = (row: any) => {
  insert(row.columnsId, getHeaderData(), tableColumns);
};

const insertLowerHeader = (row: any) => {
  insert(row.columnsId, getHeaderData(), tableColumns, true);
};

const handleDeleteRow = (index: number) => {
  tableColumns.splice(index, 1);
};

const handleRender = (row: any) => {};

onMounted(() => {});
</script>
