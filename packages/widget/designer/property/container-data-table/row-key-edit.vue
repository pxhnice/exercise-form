<template>
  <div>
    <el-form-item label="行数据Key">
      <el-input v-model="optionsModel.rowKey" />
    </el-form-item>
    <el-form-item label="宽度(px/%)">
      <el-input v-model="optionsModel.tableWidth" />
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
    <el-form-item label="显示合计">
      <el-switch v-model="optionsModel.showSummary" />
    </el-form-item>
    <el-form-item label="显示分页">
      <el-switch v-model="optionsModel.showPagination" />
    </el-form-item>
    <el-form-item v-if="optionsModel.showPagination" label="分页水平对齐">
      <el-radio-group v-model="optionsModel.paginationAlign" size="small">
        <el-radio-button label="left">居左</el-radio-button>
        <el-radio-button label="center">居中</el-radio-button>
        <el-radio-button label="right">居右</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="optionsModel.showPagination" label="小型分页">
      <el-switch v-model="optionsModel.small" />
    </el-form-item>
    <el-form-item label="表格列编辑">
      <el-button @click="isShowRow = true" type="primary" icon="Edit" round>
        编辑
      </el-button>
    </el-form-item>
    <el-form-item label="表格数据编辑">
      <el-button @click="openDataTable" type="primary" icon="Edit" round>
        编辑
      </el-button>
    </el-form-item>
    <el-form-item label="显示操作列">
      <el-switch v-model="optionsModel.showOperation" />
    </el-form-item>
    <el-form-item v-if="optionsModel.showOperation" label="操作按钮编辑">
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
            <div style="text-align: left" v-if="scope.row.headerFlag">
              {{ getDataTableHeaderLabel(scope.row) }}
            </div>
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
            <el-input
              v-if="!scope.row.headerFlag"
              v-model="scope.row.minWidth"
            />
          </template>
        </el-table-column>
        <el-table-column width="70" label="是否显示" align="center">
          <template #default="scope">
            <el-switch v-if="!scope.row.headerFlag" v-model="scope.row.show" />
          </template>
        </el-table-column>
        <el-table-column width="70" label="是否排序" align="center">
          <template #default="scope">
            <el-switch
              v-if="!scope.row.headerFlag"
              v-model="scope.row.sortable"
            />
          </template>
        </el-table-column>
        <el-table-column width="100" label="是否固定" align="center">
          <template #default="scope">
            <el-select v-if="!scope.row.headerFlag" v-model="scope.row.fixed">
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
            <el-select v-if="!scope.row.headerFlag" v-model="scope.row.format">
              <el-option-group
                v-for="group in dataTableValidator"
                :key="group.label"
                :label="group.label"
              >
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-option-group>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column width="70" label="渲染函数" align="center">
          <template #default="scope">
            <el-button
              :disabled="scope.row.format != 'render'"
              class="ex-mgl-10"
              @click="openRender(scope.row)"
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
                  <el-button @click="insertRow(scope.row)" link>
                    插入数据列
                  </el-button>
                  <el-button
                    @click="insertLowerRow(scope.row)"
                    :disabled="isInsertLowerRow(scope.row)"
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
              @click="deleteRow(scope.row)"
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
      width="800"
      v-model="isShowDataTable"
      v-bind="dialogOptions"
      title="表格JSON数据编辑"
      @close="cancel"
    >
      <ex-code-editor
        v-model="codeValue"
        height="500"
        lang="json"
        :dark="dark"
      />
      <template #footer>
        <div style="display: flex; justify-content: center">
          <el-button type="primary" size="default" @click="confirmDataTable">
            确认
          </el-button>
          <el-button size="default" @click="cancel">关闭</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      width="1000"
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
        <el-scrollbar ref="scrollbarRef" max-height="300">
          <draggable
            :list="operationButtons"
            handle=".pane-mover"
            item-key="id"
          >
            <template #item="{ element, index }">
              <div class="ex-data-table-operation">
                <el-row :gutter="10">
                  <el-col :span="1">
                    <el-icon class="pane-mover" :size="36">
                      <ex-icon-drag />
                    </el-icon>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="名称" required>
                      <el-input v-model="element.name" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="文字">
                      <el-input v-model="element.label" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="类型">
                      <el-select v-model="element.type">
                        <el-option label="default" value="" />
                        <el-option label="primary" value="primary" />
                        <el-option label="success" value="success" />
                        <el-option label="warning" value="warning" />
                        <el-option label="info" value="info" />
                        <el-option label="danger" value="danger" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="大小">
                      <el-select v-model="element.size">
                        <el-option value="large" label="large" />
                        <el-option value="default" label="default" />
                        <el-option value="small" label="small" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1"></el-col>
                  <el-col :span="3">
                    <el-form-item label="文字">
                      <el-switch
                        v-model="element.text"
                        @change="changeText($event, element)"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item label="链接">
                      <el-switch
                        v-model="element.link"
                        @change="changeLink($event, element)"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item label="圆角">
                      <el-switch
                        v-model="element.round"
                        @change="changeRound($event, element)"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item label="圆形">
                      <el-switch
                        v-model="element.circle"
                        @change="changeCircle($event, element)"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item label="禁用">
                      <el-switch v-model="element.disabled" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="点击事件" label-width="65">
                      <el-button
                        @click="
                          handleEventCode(element.onTableColumnClick, index)
                        "
                        size="small"
                        type="primary"
                        icon="Edit"
                        round
                      >
                        编写代码
                      </el-button>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-button
                      icon="Delete"
                      @click="handleDeleteButton(index)"
                      type="danger"
                      plain
                      circle
                    />
                  </el-col>
                </el-row>
              </div>
            </template>
          </draggable>
        </el-scrollbar>
        <el-button
          class="ex-mgt-10"
          type="primary"
          @click="handleAddButton"
          icon="Plus"
        >
          添加按钮
        </el-button>
      </el-form>
      <template #footer>
        <div style="display: flex; justify-content: center">
          <el-button size="default" @click="cancel">关闭</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      width="800"
      v-model="isShowRender"
      v-bind="dialogOptions"
      title="渲染函数"
      @close="isShowRender = false"
    >
      <div class="ex-dialog-box">
        <div class="name-front">
          function customRender(h, params, components) {
        </div>
        <ex-code-editor v-model="renderValue" :dark="dark" />
        <div class="name-back">}</div>
      </div>
      <template #footer>
        <div style="display: flex; justify-content: center">
          <el-button type="primary" size="default" @click="confirmRender">
            确认
          </el-button>
          <el-button size="default" @click="isShowRender = false">
            关闭
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="isShowEvent"
      width="800"
      title="按钮点击事件编辑"
      @close="handleEventCancel"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <div class="ex-dialog-box">
        <div class="name-front">onClick(row){</div>
        <ex-code-editor v-model="eventCode" :dark="dark" />
        <div class="name-back">}</div>
      </div>
      <template #footer>
        <span>
          <el-button size="default" @click="handleEventCancel">取消</el-button>
          <el-button size="default" type="primary" @click="handleConfirm">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, nextTick } from "vue";
import { ElScrollbar } from "element-plus";
import Sortable from "sortablejs";
import { desPropertyProps } from "../property";
import type {
  DesTableColumns,
  DesOperationButton
} from "@exercise-form/constants";
import { dataTableValidator } from "@exercise-form/constants";
import {
  onMessageWarning,
  onMessageError,
  getRandomNumber,
  getUniqueId
} from "@exercise-form/utils";
import { darkKeys } from "@exercise-form/components/form-designer/src/form-designer";

type CurrentRowData = {
  columns: DesTableColumns[]; //当前列表数据
  row: DesTableColumns; //当前列
  index: number; //下标
  level: number; //层级
};

type CurrentRowCallBack = (params: CurrentRowData) => void;

const props = defineProps(desPropertyProps);

const dark = inject(darkKeys);
const tableColumns = props.optionsModel.tableColumns as DesTableColumns[];
const operationButtons = props.optionsModel
  .operationButtons as DesOperationButton[];
const optionsModel = props.optionsModel;
const codeValue = ref("");
const renderValue = ref("");
const columnsId = ref();
const dataTableKey = ref("dataTable");
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();
const dataTableRef = ref();
const isShowRow = ref(false);
const isShowDataTable = ref(false);
const isShowOperation = ref(false);
const isShowRender = ref(false);
const dialogOptions = {
  draggable: true,
  destroyOnClose: true,
  closeOnClickModal: false
};
const eventCode = ref("");
const isShowEvent = ref(false);
const buttonSub = ref(-1);

const opened = () => {
  drag();
};

const getCurrentRow = (
  id: number,
  columns: DesTableColumns[],
  cb: CurrentRowCallBack,
  level = 1
) => {
  columns.forEach((row, index) => {
    if (row.children) getCurrentRow(id, row.children, cb, level + 1);
    if (id == row.columnsId) {
      cb({ columns, row, index, level });
    }
  });
};

const openDataTable = () => {
  codeValue.value = JSON.stringify(props.optionsModel.tableData, null, 2);
  isShowDataTable.value = true;
};

const openRender = (row: DesTableColumns) => {
  renderValue.value = row.render ?? "";
  columnsId.value = row.columnsId;
  isShowRender.value = true;
};

const confirmDataTable = () => {
  try {
    optionsModel["tableData"] = JSON.parse(codeValue.value);
    isShowDataTable.value = false;
  } catch (error) {
    onMessageError(`错误的选项数据:${error}`);
  }
};

const handleUpdateRender = (params: CurrentRowData) => {
  let { row } = params;
  if (!row.render) row.render = "";
  row.render = renderValue.value;
};

const confirmRender = () => {
  getCurrentRow(columnsId.value, tableColumns, handleUpdateRender);
  isShowRender.value = false;
};

const cancel = () => {
  isShowRow.value = false;
  isShowDataTable.value = false;
  isShowOperation.value = false;
  isShowRender.value = false;
};

const handleDragEvent = (id: number, targetId: number) => {
  const changeDrag = (params: CurrentRowData) => {
    let { columns, index } = params;
    let ids = getIds(columns);
    let sub = ids.indexOf(targetId);
    if (sub != -1) {
      let row = columns.splice(index, 1)[0];
      columns.splice(sub, 0, row);
    } else {
      onMessageWarning("只能在同级别节点之间进行拖拽排序！");
    }
  };
  getCurrentRow(id, tableColumns, changeDrag);
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
          let flatArr = flatColumn(tableColumns);
          let flatRow = flatArr[oldIndex];
          let targetRow = flatArr[newIndex];
          handleDragEvent(flatRow.columnsId, targetRow.columnsId);
          dataTableKey.value = dataTableKey.value + getRandomNumber();
          nextTick(() => {
            drag();
          });
        }
      }
    });
  }
};

const getDataTableHeaderLabel = (row: DesTableColumns) => {
  let label = "";
  const handleGetLabel = (params: CurrentRowData) => {
    let { level } = params;
    label = `${level}级表头`;
  };
  getCurrentRow(row.columnsId, tableColumns, handleGetLabel);
  return label;
};

const getIds = (list: DesTableColumns[]) => {
  let ids: Array<number> = [];
  list.forEach((item) => {
    ids.push(item.columnsId);
  });
  return ids;
};

const isInsertLowerRow = (row: DesTableColumns) => {
  return !row.children;
};

const isInsertLowerHeader = (row: DesTableColumns) => {
  return !row.headerFlag;
};

const flatColumn = (
  columns: DesTableColumns[],
  flatArr: Array<DesTableColumns> = []
) => {
  columns.forEach((col) => {
    flatArr.push(col);
    if (col.children?.length) {
      flatArr.push(...flatColumn(col.children));
    }
  });
  return flatArr;
};

const handleInsert = (id: number, data: DesTableColumns) => {
  const insert = (params: CurrentRowData) => {
    let { columns, index } = params;
    columns.splice(index + 1, 0, data);
  };
  getCurrentRow(id, tableColumns, insert);
};

const handleInsertLevel = (id: number, data: DesTableColumns) => {
  const insert = (params: CurrentRowData) => {
    let { row, index } = params;
    if (!row.children) row.children = [];
    let len = row.children.length;
    len > 0 ? row.children.splice(index + 1, 0, data) : row.children.push(data);
  };
  getCurrentRow(id, tableColumns, insert);
};

const handleDeleteRow = (params: CurrentRowData) => {
  let { columns, index, level } = params;
  if (level == 1 && columns.length == 1) {
    onMessageWarning("表格至少保留一列数据！");
    return;
  }
  columns.splice(index, 1);
};

const getColData = () => {
  return {
    align: "center",
    columnsId: getRandomNumber(),
    label: "",
    prop: ""
  };
};

const getHeaderData = () => {
  return {
    align: "center",
    columnsId: getRandomNumber(),
    children: [],
    headerFlag: true,
    label: "表头",
    prop: "~"
  };
};

const insertRow = (row: DesTableColumns) => {
  handleInsert(row.columnsId, getColData());
};

const insertLowerRow = (row: DesTableColumns) => {
  handleInsertLevel(row.columnsId, getColData());
};

const insertHeader = (row: DesTableColumns) => {
  handleInsert(row.columnsId, getHeaderData());
};

const insertLowerHeader = (row: DesTableColumns) => {
  handleInsertLevel(row.columnsId, getHeaderData());
};

const deleteRow = (row: DesTableColumns) => {
  getCurrentRow(row.columnsId, tableColumns, handleDeleteRow);
};

const handleAddButton = () => {
  let name = getUniqueId();
  operationButtons.push({
    disabled: false,
    label: "new btn",
    link: false,
    name,
    round: false,
    size: "small",
    text: true,
    onTableColumnClick: "",
    circle: false,
    type: ""
  });
  nextTick(() => {
    let wrapRef = scrollbarRef.value!.wrapRef;
    scrollbarRef.value!.setScrollTop(wrapRef!.scrollHeight);
  });
};

const handleEventCode = (content: string, index: number) => {
  isShowEvent.value = true;
  eventCode.value = content;
  buttonSub.value = index;
};

const handleConfirm = () => {
  operationButtons[buttonSub.value].onTableColumnClick = eventCode.value;
  handleEventCancel();
};

const handleEventCancel = () => {
  isShowEvent.value = false;
  buttonSub.value = -1;
  eventCode.value = "";
};

const handleDeleteButton = (index: number) => {
  operationButtons.splice(index, 1);
};

const changeText = (value: boolean, element: DesOperationButton) => {
  if (value) {
    element.link = false;
    element.round = false;
    element.circle = false;
  }
};

const changeLink = (value: boolean, element: DesOperationButton) => {
  if (value) {
    element.text = false;
    element.round = false;
    element.circle = false;
  }
};

const changeRound = (value: boolean, element: DesOperationButton) => {
  if (value) {
    element.link = false;
    element.text = false;
    element.circle = false;
  }
};

const changeCircle = (value: boolean, element: DesOperationButton) => {
  if (value) {
    element.text = false;
    element.round = false;
    element.link = false;
  }
};
</script>
