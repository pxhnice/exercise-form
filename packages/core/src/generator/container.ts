/**
 * @description 构建容器组件模板
 */

import { DesTableColumns, DesOperationButton } from "@exercise-form/constants";
import { buildFieldWidget } from "./field";
import { getElAttr } from "./property";
import { DesFormWidgetMethods, DesFormWidgetParams } from "../interface";

const containerTemplate = {
  grid: (params) => {
    let { widget, formConfig } = params;
    return `<el-row>
      ${
        widget.children &&
        widget.children
          .map((col) => {
            let { span, md, sm, xs, offset, push, pull } = getElAttr({
              widget: col,
              formConfig
            });
            return `<el-col ${span} ${md} ${sm} ${xs} ${offset} ${push} ${pull}>
          ${
            col.children &&
            col.children
              .map((child) => {
                if (child.category === "container") {
                  return buildContainerWidget({ widget: child, formConfig });
                } else {
                  return buildFieldWidget({ widget: child, formConfig });
                }
              })
              .join("\n")
          }
        </el-col>`;
          })
          .join("\n")
      }
    </el-row>`;
  },

  table: (params) => {
    let { widget, formConfig } = params;
    return `<table><tbody>
    ${
      widget.children &&
      widget.children
        .map((rows) => {
          return ` <tr>
      ${
        rows.children &&
        rows.children
          .map((col) => {
            let { colspan, rowspan } = getElAttr({ widget: col, formConfig });
            return ` <td ${colspan} ${rowspan}>
            ${
              col.children &&
              col.children
                .map((child) => {
                  if (child.category === "container") {
                    return buildContainerWidget({ widget: child, formConfig });
                  } else {
                    return buildFieldWidget({ widget: child, formConfig });
                  }
                })
                .join("\n")
            }
          </td>`;
          })
          .join("\n")
      }
    </tr>`;
        })
        .join("\n")
    }
   </tbody></table>`;
  },

  card: (params) => {
    let { widget, formConfig } = params;
    let { label, shadow, cardWidth } = getElAttr(params);
    return `<el-card ${cardWidth} ${shadow}>
    <template #header>
      <div class="card-header">
        <span>${label}</span>
      </div>
      ${
        widget.children &&
        widget.children
          .map((child) => {
            if (child.category === "container") {
              return buildContainerWidget({ widget: child, formConfig });
            } else {
              return buildFieldWidget({ widget: child, formConfig });
            }
          })
          .join("\n")
      }
      </template>
    </el-card>`;
  },

  tabs: (params) => {
    let { widget, formConfig } = params;
    let { onTabClick, name } = widget.options;
    let onTabClickEvent = onTabClick ? `@click="${name}TabClick"` : "";
    return `<el-tabs ${onTabClickEvent}>
      ${
        widget.children &&
        widget.children
          .map((tab) => {
            let { label, disabled } = getElAttr(params);
            return `<el-tabs-pane ${label} ${disabled}>
          ${
            tab.children &&
            tab.children
              .map((child) => {
                if (child.category === "container") {
                  return buildContainerWidget({ widget: child, formConfig });
                } else {
                  return buildFieldWidget({ widget: child, formConfig });
                }
              })
              .join("\n")
          }
          </el-tabs-pane>`;
          })
          .join("\n")
      }
    </el-tabs>`;
  },

  "data-table": (params) => {
    let { widget } = params;
    let {
      tableColumns,
      operationButtons,
      showCheckBox,
      showIndex,
      small,
      showPagination,
      name,
      onSelect,
      onSelectAll,
      onSelectionChange,
      onCellClick,
      onRowClick,
      onHeaderClick,
      onSortChange,
      onFilterChange,
      onExpandChange,
      onPageSizeChange,
      onCurrentPageChange
    } = widget.options;
    let {
      tableWidth,
      border,
      fit,
      height,
      showHeader,
      highlightCurrentRow,
      operationLabel,
      operationWidth,
      operationFixed,
      operationAlign
    } = getElAttr(params);
    // 事件
    let onSelectEvent = onSelect ? `@select="${name}Select "` : "";
    let onSelectAllEvent = onSelectAll ? `@select-all="${name}SelectAll"` : "";
    let onSelectionChangeEvent = onSelectionChange
      ? `@selection-change="${name}SelectionChange"`
      : "";
    let onCellClickEvent = onCellClick ? `@cell-click="${name}CellClick"` : "";
    let onRowClickEvent = onRowClick ? `@row-click="${name}RowClick"` : "";
    let onHeaderClickEvent = onHeaderClick
      ? `@header-click="${name}ClickEvent"`
      : "";
    let onSortChangeEvent = onSortChange
      ? `@sort-change="${name}SortChange"`
      : "";
    let onFilterChangeEvent = onFilterChange
      ? `@filter-change="${name}FilterChange"`
      : "";
    let onExpandChangeEvent = onExpandChange
      ? `@expand-change="${name}ExpandChange"`
      : "";
    let onPageSizeChangeEvent = onPageSizeChange
      ? `@size-change="${name}PageSizeChange"`
      : "";
    let onCurrentPageChangeEvent = onCurrentPageChange
      ? `@current-change="${name}CurrentPageChange"`
      : "";

    let colIndexHtml = showIndex
      ? ` <el-table-column type="index" width="50" align="center"></el-table-column>`
      : "";
    let colCheckBoxHtml = showCheckBox
      ? `<el-table-column type="selection" width="50" align="center"></el-table-column>`
      : "";
    let buttonTemplateHtml = `
    <el-table-column ${operationLabel} ${operationWidth} ${operationAlign} ${operationFixed}>
      <template #default>
      ${operationButtons
        .map((btn: DesOperationButton) => {
          let { disabled, label, round, size, text, type, link } = btn;
          let sizeAttr = size !== "default" ? `size="${size}"` : "";
          let typeAttr = type ? `type="${type}"` : "";
          let disabledAttr = disabled ? "disable" : "";
          let textAttr = text ? "text" : "";
          let roundAttr = round ? "round" : "";
          let linkAttr = link ? "link" : "";
          return `<el-button ${typeAttr} ${sizeAttr} ${linkAttr} ${textAttr} ${roundAttr} ${disabledAttr}>${label}</el-button> `;
        })
        .join("\n")}
      </template>
    </el-table-column>
    `;
    let smallAttr = small ? "small" : "";
    let paginationHtml = showPagination
      ? `<el-pagination ${smallAttr}:page-sizes="[100, 200, 300, 400]"
      ${onPageSizeChangeEvent} ${onCurrentPageChangeEvent}
      layout="total, sizes, prev, pager, next, jumper" :total="400" />`
      : "";
    return `
    <el-table :data="tableData" ${tableWidth} ${border} ${fit} ${height} ${showHeader} ${highlightCurrentRow}
    ${onSelectEvent} ${onSelectAllEvent} ${onSelectionChangeEvent} ${onCellClickEvent} ${onRowClickEvent}
    ${onHeaderClickEvent} ${onSortChangeEvent} ${onFilterChangeEvent} ${onExpandChangeEvent}>
    ${colIndexHtml}
    ${colCheckBoxHtml}
    ${tableColumns
      .map((col: DesTableColumns) => {
        let { align, label, minWidth, fixed, prop, sortable } = col;
        let alignAttr = align && align != "left" ? `align="${align}"` : "";
        let labelAttr = label ? `label="${label}"` : "";
        let minWidthAttr = minWidth ? `min-width="${minWidth}"` : "";
        let propAttr = prop ? `prop="${prop}"` : "";
        let sortableAttr = sortable ? `sortable` : "";
        let fixedAttr = fixed ? `fixed="${fixed}"` : "";
        return `<el-table-column ${propAttr} ${alignAttr} 
          ${labelAttr} ${minWidthAttr} ${fixedAttr} ${sortableAttr}>
        </el-table-column>`;
      })
      .join("\n")}
    ${buttonTemplateHtml}
    </el-table>
    ${paginationHtml}
    `;
  },

  "data-tree": (params) => {
    let { widget } = params;
    let {
      name,
      showCheckbox,
      showCheckAllOrCancelAll,
      showFilter,
      onNodeClick,
      onNodeCheck,
      onCheckChange
    } = widget.options;

    let onNodeClickEvent = onNodeClick ? `@node-click="${name}NodeClick"` : "";
    let onNodeCheckEvent = onNodeCheck ? `@check="${name}NodeCheck"` : "";
    let onCheckChangeEvent = onCheckChange
      ? `@check-change="${name}CheckChange"`
      : "";

    let { nodeKey, draggable, defaultExpandAll, lazy, props, showLinkage } =
      getElAttr(params);
    const searchInputHtml = showFilter ? "" : "showFilter";
    const expandOrRetractHtml = showCheckbox ? "" : "";
    const selectAllHtml = showCheckAllOrCancelAll ? "" : "";
    const treeDefaultTemplateHtml = `<template #default="{ node }">
    <div>{{ node.label }}</div>
    <div class="ex-tree-buttons">
      <el-button type="primary" link>添加</el-button>
      <el-button type="primary" link>删除</el-button>
    </div>
    </template>`;
    return `
    ${searchInputHtml}
    ${expandOrRetractHtml}
    ${selectAllHtml}
    <el-tree
      ref="treeRef" :data="treeData" ${nodeKey} ${draggable} ${defaultExpandAll} ${lazy} ${props} 
      ${showLinkage} ${onNodeClickEvent} ${onCheckChangeEvent} ${onNodeCheckEvent}>
      ${treeDefaultTemplateHtml}
    </el-tree>
    `;
  }
} as DesFormWidgetMethods;

export function buildContainerWidget(params: DesFormWidgetParams): string {
  let { widget } = params;
  return containerTemplate[widget.type] &&
    containerTemplate[widget.type](params)
    ? containerTemplate[widget.type](params)
    : "";
}
