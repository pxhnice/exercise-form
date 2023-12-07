import { reactive, toRefs } from "vue";
import {
  containers,
  baseFields,
  customs,
  DES_FORM_CONFIG,
  DES_HISTORY
} from "@exercise-form/constants";
import type {
  DesWidgetConfigType,
  DesWidgetListType
} from "@exercise-form/constants";
import { deepClone, getUniqueId } from "./util";

export type desPatternType = "pc" | "pad" | "h5";

const patternType: desPatternType = "pc";
const desFormConfig = deepClone(DES_FORM_CONFIG);
const desHistory = deepClone(DES_HISTORY);
const widgetList: DesWidgetListType = []; //组件数据列表
const selectWidgetId = ""; //当前选中ID
const selectWidget = {} as DesWidgetConfigType; //当前选中表单组件

const creatTarget = () => {
  return {
    patternType,
    desFormConfig,
    desHistory,
    widgetList,
    selectWidgetId,
    selectWidget
  };
};

const initPrint = () => {
  console.log(
    `%cExForm v:0.0.0-dev_1`,
    `padding: 4px;color: #fff;background:#409EFF;border-radius: 3px 0 0 0px;`
  );
};

export const createDesigner = () => {
  initPrint();
  return {
    ...toRefs(reactive(creatTarget())),
    setSelectWidget(widget: DesWidgetConfigType) {
      console.log(widget, "widget");
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
    getContinerType(type: string) {
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
          let colWidget = deepClone(this.getContinerType("grid-col"));
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
        let newCol = deepClone(this.getContinerType("table-td"));
        newCol.id = newCol.type + "_" + getUniqueId();
        newCol.options.name = newCol.id;
        newRows.children?.push(newCol);
        newWidget.children?.push(newRows);
      } else if (newWidget.type == "tabs") {
        let newTab = deepClone(this.getContinerType("tab-pane"));
        newTab.id = newTab.type + "_" + getUniqueId();
        newTab.options.name = "tab1";
        newWidget.children?.push(newTab);
      }
      return newWidget;
    },
    setPatternType(type: string) {
      this.patternType.value = type as any;
    },
    copyContainerWidget(widget: DesWidgetConfigType) {
      if (widget.type == "grid") {
        let colWidget = deepClone(this.getContinerType("grid-col"));
        colWidget.id = colWidget.type + "_" + getUniqueId();
        colWidget.options.name = colWidget.id;
        widget.children.push(colWidget);
      } else if (widget.type == "tabs") {
        let newTab = deepClone(this.getContinerType("tab-pane"));
        newTab.id = newTab.type + "_" + getUniqueId();
        let len = widget.children.length + 1;
        newTab.options.name = "tab" + len;
        newTab.options.label = "tab" + len;
        widget.children.push(newTab);
      }
    },
    copyContainerField() {},
    copyWidget(parentList: DesWidgetListType, widget: DesWidgetConfigType) {
      console.log(parentList);
      let newWidget = this.copyDeepWidget(deepClone(widget));
      parentList.push(newWidget);
    },
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
    moveUpWidget(parentList: DesWidgetListType, sub: number) {
      let item = parentList[sub];
      parentList.splice(sub, 1);
      parentList.splice(sub - 1, 0, item);
    },
    moveDownWidget(parentList: DesWidgetListType, sub: number) {
      let item = parentList[sub];
      parentList.splice(sub, 1);
      parentList.splice(sub + 1, 0, item);
    },
    deleteWidget(parentList: DesWidgetListType, sub: number) {
      parentList.splice(sub, 1);
    },
    clearAllWidget() {
      this.clearSelectWidget();
      this.widgetList.value = [];
    },
    insertCell(parentList: DesWidgetListType, cell: number, type: string) {
      parentList.forEach((child: DesWidgetConfigType) => {
        let colWidget = deepClone(this.getContinerType("table-td"));
        colWidget.id = colWidget.type + "_" + getUniqueId();
        colWidget.options.name = colWidget.id;
        if (type == "left") {
          child.children?.splice(cell, 0, colWidget);
        } else {
          child.children?.splice(cell + 1, 0, colWidget);
        }
      });
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
        let colWidget = deepClone(this.getContinerType("table-td"));
        colWidget.id = colWidget.type + "_" + getUniqueId();
        colWidget.options.name = colWidget.id;
        newRows.children?.push(colWidget);
      });
      if (type == "up") {
        parentList.splice(row, 0, newRows);
      } else {
        parentList.splice(row + 1, 0, newRows);
      }
    },
    getMergeTarget(parentList: DesWidgetListType) {
      let deepList = deepClone(parentList);
      return deepList.map((tr: any) => {
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
    },
    mergeEntireCol(parentList: DesWidgetListType, cellsub: number) {
      let len = parentList.length;
      parentList.forEach((p: DesWidgetConfigType, index: number) => {
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
    },
    deleteEntireRow(parentList: DesWidgetListType, rowsub: number) {
      parentList.splice(rowsub, 1);
      this.clearSelectWidget();
    },
    deleteEntireCol(parentList: DesWidgetListType, rowsub: number) {
      parentList.forEach((p: any) => {
        p.children.splice(rowsub, 1);
      });
      this.clearSelectWidget();
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
    }
  };
};
