import type { Ref } from "vue";
import { DesFormWidget, DesFormConfig, DesFormHistory } from "../interface";

export interface DesUseWidgetMethods {
  desFormConfig: Ref<DesFormConfig>; //表单配置
  desHistory: Ref<DesFormHistory>; //历史记录
  widgetList: Ref<DesFormWidget[]>; //表单列表
  selectWidgetId: Ref<string>; //选中ID
  selectWidget: Ref<DesFormWidget>; //当前选中组件
  dragTarget: Ref<DesFormWidget>; //当前拖动组件

  initDesigner(resetFormJson: boolean): void;
  setSelectWidget(widget: DesFormWidget): void;
  clearSelectWidget(): void;
  getContainerType(type: string): DesFormWidget;
  cloneWidget(widget: DesFormWidget): DesFormWidget;
  copyContainerWidget(widget: DesFormWidget): void;
  copyDeepWidget(widget: DesFormWidget): DesFormWidget;
  copyWidget(parentList: DesFormWidget[], widget: DesFormWidget): void;
  moveUpWidget(parentList: DesFormWidget[], sub: number): void;
  moveDownWidget(parentList: DesFormWidget[], sub: number): void;
  deleteWidget(parentList: DesFormWidget[], sub: number): void;
  clearAllWidget(): void;
  insertCell(parentList: DesFormWidget[], cell: number, type: string): void;
  insertRow(parentList: DesFormWidget[], row: number, type: string): void;
  getMergeTarget(parentList: DesFormWidget[]): DesFormWidget[];
  getMergeTargetSub(
    mergeList: DesFormWidget[],
    widgetData: DesFormWidget,
    rowsub: number
  ): number;
  mergeRightCell(
    parentList: DesFormWidget[],
    widgetData: DesFormWidget,
    rowsub: number,
    cellsub: number
  ): void;
  mergeLeftCell(
    parentList: DesFormWidget[],
    widgetData: DesFormWidget,
    rowsub: number
  ): void;
  mergeUpCell(
    parentList: DesFormWidget[],
    widgetData: DesFormWidget,
    rowsub: number,
    cellsub: number
  ): void;
  mergeDownCell(
    parentList: DesFormWidget[],
    widgetData: DesFormWidget,
    rowsub: number,
    cellsub: number
  ): void;
  mergeEntireRow(parentList: DesFormWidget[], rowsub: number): void;
  mergeEntireCol(parentList: DesFormWidget[], cellsub: number): void;
  deleteEntireRow(parentList: DesFormWidget[], rowsub: number): void;
  deleteEntireCol(parentList: DesFormWidget[], rowsub: number): void;
  revocationMerge(
    parentList: DesFormWidget[],
    widgetData: DesFormWidget,
    rowsub: number,
    cellsub: number
  ): void;
  initHistory(): void;
  emitHistoryChange(): void;
  undoHistoryStep(): void;
  redoHistoryStep(): void;
  undoEnabled(): boolean;
  redoEnabled(): boolean;
  saveFormContentToStorage(): void;
  loadFormContentFromStorage(): void;
  setDragTarget(widget: DesFormWidget): void;
  loadWidget(list: DesFormWidget[]): void;
}
