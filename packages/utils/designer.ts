import { baseFields, containers, customs, DES_FORM_CONFIG, DES_HISTORY } from '@exercise-form/constants';
import { reactive, toRefs } from 'vue';

import { localStorageUtils } from './storege';
import { deepClone, getUniqueId } from './util';

import type {
  DesFormConfigType,
  DesWidgetConfigType,
  DesWidgetListType
} from "@exercise-form/constants";
const desFormConfig = deepClone(DES_FORM_CONFIG);
const desHistory = deepClone(DES_HISTORY);
const widgetList: DesWidgetListType = []; //组件数据列表
const selectWidgetId = ""; //当前选中ID
const selectWidget = {} as DesWidgetConfigType; //当前选中表单组件

const creatTarget = () => {
  return {
    desFormConfig,
    desHistory,
    widgetList,
    selectWidgetId,
    selectWidget
  };
};

export const createDesigner = () => {
  return {
    ...toRefs(reactive(creatTarget())),
    initDesigner() {
      console.log(
        `%cExForm v:0.0.0-dev_1`,
        `padding: 4px;color: #fff;background:#409EFF;border-radius: 3px 0 0 0px;`
      );
      this.initHistoryData();
    },

    setSelectWidget(widget: DesWidgetConfigType) {
      if (!widget) {
        this.clearSelectWidget();
        return;
      }
      this.selectWidgetId.value = widget.id;
      this.selectWidget.value = widget;
    },

    clearSelectWidget() {
      this.selectWidgetId.value = "";
      this.selectWidget.value = {} as DesWidgetConfigType;
    },

    getContainerType(type: string) {
      let allWidgets = [...containers, ...baseFields, ...customs];
      let widgetData = {} as DesWidgetConfigType;
      allWidgets.forEach((widget: DesWidgetConfigType) => {
        if (type === widget.type) widgetData = widget;
      });
      return widgetData;
    },

    cloneWidget(widget: DesWidgetConfigType) {
      let newWidget = deepClone(widget);
      newWidget.id = newWidget.type + getUniqueId();
      newWidget.options.name = newWidget.id;
      if (newWidget.type == "grid") {
        for (let index = 0; index < 2; index++) {
          let colWidget = deepClone(this.getContainerType("grid-col"));
          colWidget.id = colWidget.type + "_" + getUniqueId();
          colWidget.options.name = colWidget.id;
          newWidget.children.push(colWidget);
        }
      } else if (newWidget.type == "table") {
        let newRows: DesWidgetConfigType = {
          name: "tr",
          type: "table-tr",
          id: "table-tr-" + getUniqueId(),
          options: {},
          children: []
        };
        let newCol = deepClone(this.getContainerType("table-td"));
        newCol.id = newCol.type + "_" + getUniqueId();
        newCol.options.name = newCol.id;
        newRows.children?.push(newCol);
        newWidget.children?.push(newRows);
      } else if (newWidget.type == "tabs") {
        let newTab = deepClone(this.getContainerType("tab-pane"));
        newTab.id = newTab.type + "_" + getUniqueId();
        newTab.options.name = "tab1";
        newWidget.children?.push(newTab);
      }
      return newWidget;
    },

    // setPatternType(type: string) {
    //   this.patternType.value = type as any;
    // },

    copyContainerWidget(widget: DesWidgetConfigType) {
      if (widget.type == "grid") {
        let colWidget = deepClone(this.getContainerType("grid-col"));
        colWidget.id = colWidget.type + "_" + getUniqueId();
        colWidget.options.name = colWidget.id;
        widget.children.push(colWidget);
      } else if (widget.type == "tabs") {
        let newTab = deepClone(this.getContainerType("tab-pane"));
        newTab.id = newTab.type + "_" + getUniqueId();
        let len = widget.children.length + 1;
        newTab.options.name = "tab" + len;
        newTab.options.label = "tab" + len;
        widget.children.push(newTab);
      }
    },

    copyContainerField() {},
    copyDeepWidget(widget: DesWidgetConfigType) {
      if (widget.category === "container") {
        widget.id = widget.type + "_" + getUniqueId();
        widget.options.name = widget.id;
        widget.children &&
          widget.children.forEach((wt: any) => {
            wt = this.copyDeepWidget(wt);
          });
      } else {
        widget.id = widget.type + getUniqueId();
        widget.options.name = widget.id;
      }
      return widget;
    },

    copyWidget(parentList: DesWidgetListType, widget: DesWidgetConfigType) {
      let newWidget = this.copyDeepWidget(deepClone(widget));
      parentList.push(newWidget);

      this.emitHistoryChange();
    },

    moveUpWidget(parentList: DesWidgetListType, sub: number) {
      let item = parentList[sub];
      parentList.splice(sub, 1);
      parentList.splice(sub - 1, 0, item);

      this.emitHistoryChange();
    },

    moveDownWidget(parentList: DesWidgetListType, sub: number) {
      let item = parentList[sub];
      parentList.splice(sub, 1);
      parentList.splice(sub + 1, 0, item);

      this.emitHistoryChange();
    },

    deleteWidget(parentList: DesWidgetListType, sub: number) {
      parentList.splice(sub, 1);

      this.emitHistoryChange();
    },

    clearAllWidget() {
      this.clearSelectWidget();
      this.widgetList.value = [];

      this.emitHistoryChange();
    },

    insertCell(parentList: DesWidgetListType, cell: number, type: string) {
      parentList.forEach((child) => {
        let colWidget = deepClone(this.getContainerType("table-td"));
        colWidget.id = colWidget.type + "_" + getUniqueId();
        colWidget.options.name = colWidget.id;
        if (type == "left") {
          child.children?.splice(cell, 0, colWidget);
        } else {
          child.children?.splice(cell + 1, 0, colWidget);
        }
      });

      this.emitHistoryChange();
    },

    insertRow(parentList: DesWidgetListType, row: number, type: string) {
      let newRows: DesWidgetConfigType = {
        name: "tr",
        type: "table-tr",
        id: "table-tr-" + getUniqueId(),
        options: {},
        children: []
      };
      parentList[row].children?.forEach(() => {
        let colWidget = deepClone(this.getContainerType("table-td"));
        colWidget.id = colWidget.type + "_" + getUniqueId();
        colWidget.options.name = colWidget.id;
        newRows.children?.push(colWidget);
      });
      if (type == "up") {
        parentList.splice(row, 0, newRows);
      } else {
        parentList.splice(row + 1, 0, newRows);
      }
      this.emitHistoryChange();
    },

    getMergeTarget(parentList: DesWidgetListType) {
      let deepList = deepClone(parentList);
      return deepList.map((tr) => {
        tr.children = tr.children.filter((item: any) => item.merged);
        return tr;
      });
    },

    getMergeTargetSub(
      mergeList: DesWidgetListType,
      widgetData: DesWidgetConfigType,
      rowsub: number
    ) {
      let rows = mergeList[rowsub].children || [];
      let index = rows.findIndex((item: any) => item.id == widgetData.id);
      return index;
    },

    mergeRightCell(
      parentList: DesWidgetListType,
      widgetData: DesWidgetConfigType,
      rowsub: number,
      cellsub: number
    ) {
      let mergeList = this.getMergeTarget(parentList);
      let tableRows = mergeList[rowsub].children;
      let mergesub = this.getMergeTargetSub(mergeList, widgetData, rowsub);
      let parentRows = parentList[rowsub].children || [];
      let tableCell = tableRows[mergesub + 1];
      let targetSub = parentRows.findIndex(
        (item: any) => item.id == tableCell.id
      );
      let targetSpan = parentRows[targetSub].options.colspan;
      let { colspan, rowspan } = widgetData.options;
      let span = colspan + targetSpan;
      for (let i = 0; i < rowspan; i++) {
        let rows = parentList[rowsub + i].children || [];
        for (let index = 0; index < span; index++) {
          let cell = rows[cellsub + index];
          cell.options.colspan = span;
          cell.options.rowspan = rowspan;
          if (index == 0 && i == 0) {
            this.setSelectWidget(cell);
          } else {
            cell.merged = false;
          }
        }
      }
      this.emitHistoryChange();
    },

    mergeLeftCell(
      parentList: DesWidgetListType,
      widgetData: DesWidgetConfigType,
      rowsub: number
    ) {
      let mergeList = this.getMergeTarget(parentList);
      let mergesub = this.getMergeTargetSub(mergeList, widgetData, rowsub);
      let tableRows = mergeList[rowsub].children;
      let parentRows = parentList[rowsub].children || [];
      let tableCell = tableRows[mergesub - 1];
      let targetSub = parentRows.findIndex(
        (item: any) => item.id == tableCell.id
      );
      let targetSpan = parentRows[targetSub].options.colspan;
      let rowspan = parentRows[targetSub].options.rowspan;
      let { colspan } = widgetData.options;
      let span = colspan + targetSpan;
      for (let i = 0; i < rowspan; i++) {
        let rows = parentList[rowsub + i].children || [];
        for (let index = 0; index < span; index++) {
          let cell = rows[targetSub + index];
          cell.options.colspan = span;
          if (index == 0 && i == 0) {
            this.setSelectWidget(cell);
          } else {
            cell.merged = false;
          }
        }
      }
      this.emitHistoryChange();
    },

    mergeUpCell(
      parentList: DesWidgetListType,
      widgetData: DesWidgetConfigType,
      rowsub: number,
      cellsub: number
    ) {
      let { rowspan, colspan } = widgetData.options;
      let parentRows = parentList[rowsub - 1].children || [];
      let topSpan = parentRows[cellsub].options.rowspan;
      let span = rowspan + topSpan;
      let targetSub = rowsub - topSpan;
      for (let index = 0; index < span; index++) {
        let rows = parentList[targetSub + index].children || [];
        for (let i = 0; i < colspan; i++) {
          let cell = rows[cellsub + i];
          cell.options.rowspan = span;
          if (index == 0 && i == 0) {
            this.setSelectWidget(cell);
          } else {
            cell.merged = false;
          }
        }
      }
      this.emitHistoryChange();
    },

    mergeDownCell(
      parentList: DesWidgetListType,
      widgetData: DesWidgetConfigType,
      rowsub: number,
      cellsub: number
    ) {
      let { rowspan, colspan } = widgetData.options;
      let parentRows = parentList[rowsub + rowspan].children || [];
      let targetSpan = parentRows[cellsub].options.rowspan;
      let span = rowspan + targetSpan;
      for (let index = 0; index < span; index++) {
        let rows = parentList[rowsub + index].children || [];
        for (let i = 0; i < colspan; i++) {
          let cell = rows[cellsub + i];
          cell.options.rowspan = span;
          if (index == 0 && i == 0) {
            this.setSelectWidget(cell);
          } else {
            cell.merged = false;
          }
        }
      }
      this.emitHistoryChange();
    },

    mergeEntireRow(parentList: DesWidgetListType, rowsub: number) {
      let children = parentList[rowsub].children || [];
      for (let i = 0; i < children.length; i++) {
        if (i == 0) {
          children[i].options.colspan = children.length;
          this.setSelectWidget(children[i]);
        } else {
          children[i].merged = false;
          children[i].options.colspan = children.length;
        }
      }

      this.emitHistoryChange();
    },
    mergeEntireCol(parentList: DesWidgetListType, cellsub: number) {
      let len = parentList.length;
      parentList.forEach((p, index) => {
        if (p.children) {
          let cell = p.children[cellsub] || [];
          if (index == 0) {
            cell.options.rowspan = len;
            this.setSelectWidget(cell);
          } else {
            cell.merged = false;
            cell.options.rowspan = len;
          }
        }
      });
      this.emitHistoryChange();
    },

    deleteEntireRow(parentList: DesWidgetListType, rowsub: number) {
      parentList.splice(rowsub, 1);
      this.clearSelectWidget();
      this.emitHistoryChange();
    },

    deleteEntireCol(parentList: DesWidgetListType, rowsub: number) {
      parentList.forEach((p) => {
        p.children.splice(rowsub, 1);
      });
      this.clearSelectWidget();
      this.emitHistoryChange();
    },

    revocationMerge(
      parentList: DesWidgetListType,
      widgetData: DesWidgetConfigType,
      rowsub: number,
      cellsub: number
    ) {
      let { rowspan, colspan } = widgetData.options;
      for (let index = 0; index < rowspan; index++) {
        let rows = parentList[rowsub + index].children || [];
        for (let i = 0; i < colspan; i++) {
          let cell = rows[cellsub + i];
          cell.merged = true;
          cell.options.colspan = 1;
          cell.options.rowspan = 1;
        }
      }
      this.emitHistoryChange();
    },

    initHistoryData() {
      this.loadFormContentFromStorage();
      this.desHistory.value.index++;
      this.desHistory.value.steps[this.desHistory.value.index] = {
        widgetList: deepClone(this.widgetList.value),
        desFormConfig: deepClone(this.desFormConfig.value)
      };
    },

    emitHistoryChange() {
      let index = this.desHistory.value.index;
      let maxStep = this.desHistory.value.maxStep;
      if (index == maxStep - 1) {
        this.desHistory.value.steps.shift();
      } else {
        this.desHistory.value.index++;
      }
      this.desHistory.value.steps[this.desHistory.value.index] = {
        widgetList: deepClone(this.widgetList.value),
        desFormConfig: deepClone(this.desFormConfig.value)
      };
      this.saveFormContentToStorage();
      console.log(this.desHistory);
    },

    undoHistoryStep() {
      if (this.desHistory.value.index !== 0) {
        this.desHistory.value.index--;
      }
      this.widgetList.value =
        this.desHistory.value.steps[this.desHistory.value.index].widgetList;
      this.desFormConfig.value =
        this.desHistory.value.steps[this.desHistory.value.index].desFormConfig;

      this.saveFormContentToStorage();
    },

    redoHistoryStep() {
      if (
        this.desHistory.value.index !==
        this.desHistory.value.steps.length - 1
      ) {
        this.desHistory.value.index++;
      }
      this.widgetList.value =
        this.desHistory.value.steps[this.desHistory.value.index].widgetList;
      this.desFormConfig.value =
        this.desHistory.value.steps[this.desHistory.value.index].desFormConfig;

      this.saveFormContentToStorage();
    },
    undoEnabled() {
      return (
        this.desHistory.value.index > 0 &&
        this.desHistory.value.steps.length > 0
      );
    },

    redoEnabled() {
      return (
        this.desHistory.value.index < this.desHistory.value.steps.length - 1
      );
    },

    saveFormContentToStorage() {
      let storage = localStorageUtils();
      storage.set("ex_widget_list", this.widgetList.value);
      storage.set("ex_form_config", this.desFormConfig.value);
    },

    loadFormContentFromStorage() {
      let storage = localStorageUtils();
      let list = storage.get("ex_widget_list");
      let form = storage.get("ex_form_config");
      if (list) {
        this.widgetList.value = list as DesWidgetListType;
      }
      if (form) {
        this.desFormConfig.value = form as DesFormConfigType;
      }
    }
  };
};
