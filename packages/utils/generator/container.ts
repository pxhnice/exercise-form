import { buildFieldWidget } from "./field";
import { getElAttr } from "./property";

import type {
  DesWidget,
  DesFormConfig,
  DesTableColumns,
  DesOperationButton
} from "@exercise-form/constants";

type DesTemplateMethod = {
  [key: string]: (widget: DesWidget, formConfig: DesFormConfig) => string;
};

const containerTemplate: DesTemplateMethod = {
  grid: (widget, formConfig) => {
    return `<el-row>
      ${
        widget.children &&
        widget.children
          .map((col) => {
            let { span, md, sm, xs, offset, push, pull } = getElAttr(
              col,
              formConfig
            );
            return `<el-col ${span} ${md} ${sm} ${xs} ${offset} ${push} ${pull}>
          ${
            col.children &&
            col.children
              .map((child) => {
                if (child.category === "container") {
                  return buildContainerWidget(child, formConfig);
                } else {
                  return buildFieldWidget(child, formConfig);
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
  table: (widget, formConfig) => {
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
            let { colspan, rowspan } = getElAttr(col, formConfig);
            return ` <td ${colspan} ${rowspan}>
            ${
              col.children &&
              col.children
                .map((child) => {
                  if (child.category === "container") {
                    return buildContainerWidget(child, formConfig);
                  } else {
                    return buildFieldWidget(child, formConfig);
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
  card: (widget, formConfig) => {
    let { label, shadow, cardWidth } = getElAttr(widget, formConfig);
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
              return buildContainerWidget(child, formConfig);
            } else {
              return buildFieldWidget(child, formConfig);
            }
          })
          .join("\n")
      }
      </template>
    </el-card>`;
  },
  tabs: (widget, formConfig) => {
    return `<el-tabs>
      ${
        widget.children &&
        widget.children
          .map((tab) => {
            let { label, disabled } = getElAttr(widget, formConfig);
            return `<el-tabs-pane ${label} ${disabled}>
          ${
            tab.children &&
            tab.children
              .map((child) => {
                if (child.category === "container") {
                  return buildContainerWidget(child, formConfig);
                } else {
                  return buildFieldWidget(child, formConfig);
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
  "data-table": (widget, formConfig) => {
    let {
      tableColumns,
      operationButtons,
      showCheckBox,
      showIndex,
      small,
      showPagination
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
    } = getElAttr(widget, formConfig);
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
      layout="total, sizes, prev, pager, next, jumper" :total="400" />`
      : "";
    return `
    <el-table :data="tableData" ${tableWidth} ${border} ${fit} ${height} ${showHeader} ${highlightCurrentRow}>
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
  "data-tree": (widget, formConfig) => {
    let { showCheckbox, showCheckAllOrCancelAll, showFilter } = widget.options;
    let { nodeKey, draggable, defaultExpandAll, lazy, props, showLinkage } =
      getElAttr(widget, formConfig);
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
      ref="treeRef" :data="treeData" ${nodeKey} ${draggable} ${defaultExpandAll} ${lazy} ${props} ${showLinkage}>
      ${treeDefaultTemplateHtml}
    </el-tree>
    `;
  }
};

export function buildContainerWidget(
  widget: DesWidget,
  formConfig: DesFormConfig
): string {
  return containerTemplate[widget.type] &&
    containerTemplate[widget.type](widget, formConfig)
    ? containerTemplate[widget.type](widget, formConfig)
    : "";
}
