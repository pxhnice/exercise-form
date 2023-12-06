import { toRefs, reactive } from "vue";
import { containers, baseFields, customs } from "@exercise-form/constants";
import { deepClone, getUniqueId } from "@exercise-form/utils";

export type WidgetConfigType = {
  name: string;
  iconName?: string;
  category?: string;
  type: string;
  // children?: Array<WidgetConfigType>;
  options: { [key: string]: any };
  [key: string]: any;
};

export type WidgetHistoryType = {
  index: number;
  maxStep: number;
  steps: Array<any>;
};

export interface DesignerFormConfigType {
  cssCode: string;
  [key: string]: any;
}

export interface PropsWidgetType {
  widgetData: WidgetConfigType;
  parentList: Array<WidgetConfigType>;
  widgetSub: number;
  parentData?: WidgetConfigType;
  designer: any;
}

let customClass: Array<string> = [];
let selectWidget = {} as WidgetConfigType;
let widgetList: Array<WidgetConfigType> = [];
let history: WidgetHistoryType = {
  index: -1,
  maxStep: 10,
  steps: []
};

function getDesignerData() {
  let formConfig = getFormConfigDefalut();
  return {
    customClass,
    widgetList,
    selectWidget,
    history,
    formConfig,
    patternType: "pc",
    selectWidgetId: ""
  };
}

function getFormConfigDefalut() {
  return {
    size: "default",
    labelPosition: "left",
    align: "left",
    labelWidth: 100,
    modelName: "formData",
    formName: "formRef",
    rulesName: "rules",
    isPageType: "page",
    hideRequiredAsterisk: false,
    cssCode: "",
    customClass: [],
    functions: "",
    onFormCreated: "",
    onFormMounted: "",
    onFormDataChange: ""
  };
}

export function createDesigner() {
  const widgetData = reactive(getDesignerData());
  return {
    ...toRefs(widgetData),
    initDesigner() {
      console.log(this, "init");
      console.log(
        `%c%cExForm v:0.0.0-dev_1`,
        `padding: 4px;color: #fff;background:#409EFF;border-radius: 3px 0 0 3px;`,
        `padding: 4px;color: #fff; background:#409EFF;border-radius: 0 3px 3px 0;`
      );
    },
    setSelectWidget(widget: WidgetConfigType) {
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
      this.selectWidget.value = {} as WidgetConfigType;
    },
    getContinerType(type: string) {
      let allWidgets = [...containers, ...baseFields, ...customs];
      let widgetData = {} as WidgetConfigType;
      allWidgets.forEach((widget: WidgetConfigType) => {
        if (type === widget.type) widgetData = widget;
      });
      return widgetData;
    },
    cloneWidget(widget: WidgetConfigType) {
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
        let newRows: WidgetConfigType = {
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
      this.patternType.value = type;
    },
    copyContainerWidget(widget: WidgetConfigType) {
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
    copyWidget(parentList: WidgetConfigType[], widget: WidgetConfigType) {
      console.log(parentList);
      let newWidget = this.copyDeepWidget(deepClone(widget));
      parentList.push(newWidget);
    },
    copyDeepWidget(widget: WidgetConfigType) {
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
    moveUpWidget(parentList: WidgetConfigType[], sub: number) {
      let item = parentList[sub];
      parentList.splice(sub, 1);
      parentList.splice(sub - 1, 0, item);
    },
    moveDownWidget(parentList: WidgetConfigType[], sub: number) {
      let item = parentList[sub];
      parentList.splice(sub, 1);
      parentList.splice(sub + 1, 0, item);
    },
    deleteWidget(parentList: WidgetConfigType[], sub: number) {
      parentList.splice(sub, 1);
    },
    clearAllWidget() {
      this.clearSelectWidget();
      this.widgetList.value = [];
    },
    insertCell(parentList: WidgetConfigType[], cell: number, type: string) {
      parentList.forEach((child: WidgetConfigType) => {
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
    insertRow(parentList: WidgetConfigType[], row: number, type: string) {
      let newRows: WidgetConfigType = {
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
    getMergeTarget(parentList: WidgetConfigType[]) {
      let deepList = deepClone(parentList);
      return deepList.map((tr: any) => {
        tr.children = tr.children.filter((item: any) => item.merged);
        return tr;
      });
    },
    getMergeTargetSub(
      mergeList: WidgetConfigType[],
      widgetData: WidgetConfigType,
      rowsub: number
    ) {
      let rows = mergeList[rowsub].children || [];
      let index = rows.findIndex((item: any) => item.id == widgetData.id);
      return index;
    },
    mergeRightCell(
      parentList: WidgetConfigType[],
      widgetData: WidgetConfigType,
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
      parentList: WidgetConfigType[],
      widgetData: WidgetConfigType,
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
      parentList: WidgetConfigType[],
      widgetData: WidgetConfigType,
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
      parentList: WidgetConfigType[],
      widgetData: WidgetConfigType,
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
    mergeEntireRow(parentList: WidgetConfigType[], rowsub: number) {
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
    mergeEntireCol(parentList: WidgetConfigType[], cellsub: number) {
      let len = parentList.length;
      parentList.forEach((p: WidgetConfigType, index: number) => {
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
    deleteEntireRow(parentList: WidgetConfigType[], rowsub: number) {
      parentList.splice(rowsub, 1);
      this.clearSelectWidget();
    },
    deleteEntireCol(parentList: WidgetConfigType[], rowsub: number) {
      parentList.forEach((p: any) => {
        p.children.splice(rowsub, 1);
      });
      this.clearSelectWidget();
    },
    revocationMerge(
      parentList: WidgetConfigType[],
      widgetData: WidgetConfigType,
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
}
