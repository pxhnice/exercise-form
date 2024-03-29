/**
 * @description 操作表单数据
 */

import { reactive, toRefs } from "vue";
import { baseFields, containers, customs } from "@exercise-form/constants";
import {
  localStorageUtils,
  deepClone,
  getUniqueId
} from "@exercise-form/utils";
import { DesFormWidget, DesFormConfig } from "../interface";
import { DesUseWidgetMethods } from "./interface";

function getContainerTableData(): DesFormWidget {
  return {
    name: "tr",
    type: "table-tr",
    id: "tabletr" + getUniqueId(),
    category: "container",
    options: {},
    children: []
  };
}

export function useDesigner(): DesUseWidgetMethods {
  return {
    ...toRefs(
      reactive({
        desFormConfig: {
          size: "default",
          labelPosition: "left",
          align: "left",
          labelWidth: 100,
          dataSources: [],
          modelName: "formData",
          formName: "formRef",
          rulesName: "rules",
          patternType: "pc",
          isPageType: "page",
          hideRequiredAsterisk: false,
          cssCode: "",
          customClass: [],
          functions: "",
          onFormCreated: "",
          onFormMounted: "",
          onFormDataChange: ""
        },
        desHistory: {
          index: -1,
          maxStep: 10,
          steps: []
        },
        widgetList: [],
        selectWidgetId: "",
        selectWidget: {} as DesFormWidget,
        dragTarget: {} as DesFormWidget
      })
    ),
    initDesigner(resetFormJson: boolean) {
      console.log(
        `%cExForm %cv:0.0.0-dev_1 \nhttps://gitee.com/pxhgood/exercise-form.git`,
        `color: #409EFF;font-size:20px;font-weight:bold`,
        `color:#666`
      );
      if (!resetFormJson) {
        this.initHistory();
      }
    },

    setSelectWidget(widget) {
      if (!widget) {
        this.clearSelectWidget();
        return;
      }
      this.selectWidgetId.value = widget.id;
      this.selectWidget.value = widget;
      this.dragTarget.value = widget;
    },

    clearSelectWidget() {
      this.selectWidgetId.value = "";
      this.selectWidget.value = {} as DesFormWidget;
    },

    getContainerType(type) {
      let allWidgets = [...containers, ...baseFields, ...customs];
      let widgetData = {} as DesFormWidget;
      allWidgets.forEach((widget) => {
        if (type === widget.type) widgetData = widget;
      });
      return widgetData;
    },

    cloneWidget(widget) {
      let newWidget = deepClone(widget);
      this.dragTarget.value = widget;
      newWidget.id = newWidget.type + getUniqueId();
      newWidget.id = newWidget.id.replace(/-/g, "");
      newWidget.options.name = newWidget.id;
      if (newWidget.type == "grid") {
        for (let index = 0; index < 2; index++) {
          let colWidget = deepClone(this.getContainerType("grid-col"));
          colWidget.id = colWidget.type + getUniqueId();
          colWidget.options.name = colWidget.id;
          newWidget.children?.push(colWidget);
        }
      } else if (newWidget.type == "table") {
        let newRows = getContainerTableData();
        let newCol = deepClone(this.getContainerType("table-td"));
        newCol.id = newCol.type + getUniqueId();
        newCol.options.name = newCol.id;
        newRows.children?.push(newCol);
        newWidget.children?.push(newRows);
      } else if (newWidget.type == "tabs") {
        let newTab = deepClone(this.getContainerType("tab-pane"));
        newTab.id = newTab.type + getUniqueId();
        newTab.options.name = "tab1";
        newWidget.children?.push(newTab);
      }
      return newWidget;
    },

    copyContainerWidget(widget) {
      if (widget.type == "grid") {
        let colWidget = deepClone(this.getContainerType("grid-col"));
        colWidget.id = colWidget.type + getUniqueId();
        colWidget.options.name = colWidget.id;
        widget.children?.push(colWidget);
      } else if (widget.type == "tabs") {
        let newTab = deepClone(this.getContainerType("tab-pane"));
        newTab.id = newTab.type + getUniqueId();
        let len = widget.children?.length;
        newTab.options.name = "tab" + len + 1;
        newTab.options.label = "tab" + len + 1;
        widget.children?.push(newTab);
      }
    },

    copyDeepWidget(widget) {
      if (widget.category === "container") {
        widget.id = widget.type + getUniqueId();
        widget.options.name = widget.id;
        widget.children &&
          widget.children.forEach((wt) => {
            wt = this.copyDeepWidget(wt);
          });
      } else {
        widget.id = widget.type + getUniqueId();
        widget.options.name = widget.id;
      }
      return widget;
    },

    copyWidget(parentList, widget) {
      let newWidget = this.copyDeepWidget(deepClone(widget));
      parentList.push(newWidget);
      this.emitHistoryChange();
    },

    moveUpWidget(parentList, sub) {
      let item = parentList[sub];
      parentList.splice(sub, 1);
      parentList.splice(sub - 1, 0, item);

      this.emitHistoryChange();
    },

    moveDownWidget(parentList, sub) {
      let item = parentList[sub];
      parentList.splice(sub, 1);
      parentList.splice(sub + 1, 0, item);

      this.emitHistoryChange();
    },

    deleteWidget(parentList, sub) {
      parentList.splice(sub, 1);
      this.clearSelectWidget();

      this.emitHistoryChange();
    },

    clearAllWidget() {
      this.clearSelectWidget();
      this.widgetList.value = [];

      this.emitHistoryChange();
    },

    insertCell(parentList, cell, type) {
      parentList.forEach((child) => {
        let colWidget = deepClone(this.getContainerType("table-td"));
        colWidget.id = colWidget.type + getUniqueId();
        colWidget.options.name = colWidget.id;
        if (type == "left") {
          child.children?.splice(cell, 0, colWidget);
        } else {
          child.children?.splice(cell + 1, 0, colWidget);
        }
      });

      this.emitHistoryChange();
    },

    insertRow(parentList, row, type) {
      let newRows = getContainerTableData();
      parentList[row].children?.forEach(() => {
        let colWidget = deepClone(this.getContainerType("table-td"));
        colWidget.id = colWidget.type + getUniqueId();
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

    getMergeTarget(parentList) {
      let deepList = deepClone(parentList);
      return deepList.map((tr) => {
        tr.children = tr.children?.filter((item) => item.merged);
        return tr;
      });
    },

    getMergeTargetSub(mergeList, widgetData, rowsub) {
      let rows = mergeList[rowsub].children || [];
      let index = rows.findIndex((item) => item.id == widgetData.id);
      return index;
    },

    mergeRightCell(parentList, widgetData, rowsub, cellsub) {
      let mergeList = this.getMergeTarget(parentList);
      let tableRows = mergeList[rowsub].children || [];
      let mergesub = this.getMergeTargetSub(mergeList, widgetData, rowsub);
      let tableCell = tableRows[mergesub + 1];
      let parentRows = parentList[rowsub].children || [];
      let targetSub = parentRows.findIndex((item) => item.id == tableCell.id);
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

    mergeLeftCell(parentList, widgetData, rowsub) {
      let mergeList = this.getMergeTarget(parentList);
      let mergesub = this.getMergeTargetSub(mergeList, widgetData, rowsub);
      let tableRows = mergeList[rowsub].children || [];
      let parentRows = parentList[rowsub].children || [];
      let tableCell = tableRows[mergesub - 1];
      let targetSub = parentRows.findIndex((item) => item.id == tableCell.id);
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

    mergeUpCell(parentList, widgetData, rowsub, cellsub) {
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

    mergeDownCell(parentList, widgetData, rowsub, cellsub) {
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

    mergeEntireRow(parentList, rowsub) {
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
    mergeEntireCol(parentList, cellsub) {
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

    deleteEntireRow(parentList, rowsub) {
      parentList.splice(rowsub, 1);

      this.clearSelectWidget();
      this.emitHistoryChange();
    },

    deleteEntireCol(parentList, rowsub) {
      parentList.forEach((p) => {
        p.children?.splice(rowsub, 1);
      });

      this.clearSelectWidget();
      this.emitHistoryChange();
    },

    revocationMerge(parentList, widgetData, rowsub, cellsub) {
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

    initHistory() {
      this.loadFormContentFromStorage();
      this.desHistory.value.index++;
      this.desHistory.value.steps[this.desHistory.value.index] = {
        widgetList: deepClone(this.widgetList.value),
        formConfig: deepClone(this.desFormConfig.value)
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
        formConfig: deepClone(this.desFormConfig.value)
      };

      this.saveFormContentToStorage();
    },

    undoHistoryStep() {
      if (this.desHistory.value.index !== 0) {
        this.desHistory.value.index--;
      }
      this.widgetList.value =
        this.desHistory.value.steps[this.desHistory.value.index].widgetList;
      this.desFormConfig.value =
        this.desHistory.value.steps[this.desHistory.value.index].formConfig;

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
        this.desHistory.value.steps[this.desHistory.value.index].formConfig;

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
      if (list) this.widgetList.value = list as DesFormWidget[];
      if (form) this.desFormConfig.value = form as DesFormConfig;
    },

    setDragTarget(widget) {
      this.dragTarget.value = widget;
    },

    loadWidget(list) {
      this.widgetList.value = list;

      this.emitHistoryChange();
    }
  };
}

export default useDesigner;
