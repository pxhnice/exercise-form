import { genVue3JS } from './vue3Js-generator';

import type {
  DesWidgetConfigType,
  DesWidgetListType,
  DesFormConfigType
} from "@exercise-form/constants";

// 不需要el-form-item的组件
const staticTypeList = ["text", "alert", "divider"];
// 容器组件
const containerTemplate: { [key: string]: any } = {
  grid: (ctn: DesWidgetConfigType, formConfig: DesFormConfigType) => {
    return `<el-row>
      ${
        ctn.children &&
        ctn.children
          .map((col: DesWidgetConfigType) => {
            let { span, md, sm, xs, offset, push, pull } = col.options;
            const spanAttr = span ? `:span="${span}"` : "";
            const mdAttr = md ? `:md="${md}"` : "";
            const smAttr = sm ? `:sm="${sm}"` : "";
            const xsAtrr = xs ? `:xs="${xs}"` : "";
            const offsetAttr = offset ? `:offset="${offset}"` : "";
            const pushAttr = push ? `:push="${push}"` : "";
            const pullAtrr = pull ? `:pull="${pull}"` : "";
            return `<el-col ${spanAttr} ${mdAttr} ${smAttr} ${xsAtrr} ${offsetAttr} ${pushAttr} ${pullAtrr}>
          ${
            col.children &&
            col.children
              .map((child: DesWidgetConfigType) => {
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
  table: (ctn: DesWidgetConfigType, formConfig: DesFormConfigType) => {
    return `<table><tbody>
    ${
      ctn.children &&
      ctn.children
        .map((rows: DesWidgetConfigType) => {
          return ` <tr>
      ${
        rows.children &&
        rows.children
          .map((col: DesWidgetConfigType) => {
            let { colspan, rowspan } = col.options;
            let colspanAttr = colspan > 1 ? `:colspan="${colspan}"` : "";
            let rowspanAttr = rowspan > 1 ? `:rowspan="${rowspan}"` : "";
            return ` <td ${colspanAttr} ${rowspanAttr}>
            ${
              col.children &&
              col.children
                .map((child: DesWidgetConfigType) => {
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
  card: (cw: DesWidgetConfigType, formConfig: DesFormConfigType) => {
    let { shadow, cardWidth, label } = cw.options;
    let shadowAttr = shadow ? `:shadow="true"` : "";
    let cardWidthAttr = cardWidth ? `style="{width:${cardWidth}}"` : "";
    return `<el-card ${cardWidthAttr} ${shadowAttr}>
    <template #header>
      <div class="card-header">
        <span>${label}</span>
      </div>
      ${
        cw.children &&
        cw.children
          .map((child: DesWidgetConfigType) => {
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
  tabs: (ctn: DesWidgetConfigType, formConfig: DesFormConfigType) => {
    return `<el-tabs>
      ${
        ctn.children &&
        ctn.children
          .map((tab: any) => {
            let { label, disabled } = tab.options;
            let labelAttr = label ? `label="${label}"` : "";
            let disabledAttr = disabled ? `:disabled=${disabled}` : "";
            return `<el-tabs-pane ${labelAttr} ${disabledAttr}>
          ${tab.children
            .map((child: any) => {
              if (child.category === "container") {
                return buildContainerWidget(child, formConfig);
              } else {
                return buildFieldWidget(child, formConfig);
              }
            })
            .join("\n")}
          </el-tabs-pane>`;
          })
          .join("\n")
      }
    </el-tabs>`;
  }
};

function buildContainerWidget(
  widget: DesWidgetConfigType,
  formConfig: DesFormConfigType
): string {
  return containerTemplate[widget.type](widget, formConfig)
    ? containerTemplate[widget.type](widget, formConfig)
    : null;
}
// 组件属性
function getElAttr(widget: DesWidgetConfigType, formConfig: DesFormConfigType) {
  let wop = widget.options;
  return {
    modelValue: `v-model="${formConfig.modelName}.${widget.id}"`,
    clearable: wop.clearable ? "clearable" : "",
    disabled: wop.disabled ? `disabled` : "",
    maxLength: wop.maxLength ? `:max-length="${wop.maxLength}"` : "",
    minLength: wop.minLength ? `:min-length="${wop.minLength}"` : "",
    multiple: wop.multiple ? "multiple" : "",
    multipleLimit: wop.multipleLimit
      ? `:multiple-limit="${wop.multipleLimit}"`
      : "",
    placeholder: wop.placeholder ? `placeholder="${wop.placeholder}"` : "",
    readonly: wop.readonly ? `readonly` : "",
    required: wop.required ? `required` : "",
    size: wop.size !== "default" ? `size="${wop.size}"` : "",
    type: wop.type ? `type="${wop.type}"` : "",
    editable: wop.editable ? `editable` : "",
    border: wop.border ? `border` : "",
    allowHalf: wop.allowHalf ? `allow-half` : "",
    format: wop.format ? `format="${wop.format}"` : "",
    valueFormat: wop.valueFormat ? `value-format="${wop.valueFormat}"` : "",
    endPlaceholder: wop.endPlaceholder
      ? `end-placeholder="${wop.endPlaceholder}"`
      : "",
    startPlaceholder: wop.startPlaceholder
      ? `start-placeholder="${wop.startPlaceholder}"`
      : "",
    rows: wop.rows ? `:rows="${wop.rows}"` : "",
    max: wop.max ? `:max="${wop.max}"` : "",
    step: wop.step ? `:step="${wop.step}"` : "",
    showStops: wop.showStops ? `show-stops` : "",
    closable: wop.closable ? `closable` : "",
    description: wop.description ? `description="${wop.description}"` : "",
    showIcon: wop.showIcon ? `show-icon` : "",
    fontSize: wop.fontSize ? `style="{font-size:'${wop.fontSize}'}"` : "",
    tag: wop.tag ? `tag="${wop.tag}"` : "",
    truncated: wop.truncated ? `truncated` : "",
    borderStyle: wop.borderStyle ? `border-style="${wop.borderStyle}"` : "",
    contentPosition: wop.contentPosition
      ? `content-position="${wop.contentPosition}"`
      : "",
    direction: wop.direction ? `direction="${wop.direction}"` : "",
    title: wop.title ? `title="${wop.title}"` : "",
    labelWidth: wop.labelWidth ? `label-width="${wop.labelWidth}"` : "",
    align: wop.align ? `align="${wop.align}"` : "",
    label: wop.label ? `label="${wop.label}"` : "",
    customClass:
      wop.customClass && wop.customClass.length > 0
        ? `class="${wop.customClass.join(" ")}"`
        : ""
  };
}

function buildRadioChildren(widget: DesWidgetConfigType) {
  let { buttonMode, border } = widget.options;
  let borderAttr = border && !buttonMode ? `:border` : "";
  let tag = buttonMode ? "el-radio-button" : "el-radio";
  return `<${tag} v-for="item in ${widget.id}Options" :key="item.value" :label="item.value" ${borderAttr}>{{item.label}}</${tag}>`;
}

function buildCheckboxChildren(widget: DesWidgetConfigType) {
  let { buttonMode, border } = widget.options;
  let borderAttr = border && !buttonMode ? `:border` : "";
  let tag = buttonMode ? "el-checkbox-button" : "el-checkbox";
  return `<${tag} v-for="item in ${widget.id}Options" :key="item.value" :label="item.value" ${borderAttr}>{{item.label}}</${tag}>`;
}

function buildSelectChildren(widget: DesWidgetConfigType) {
  let tag = "el-option";
  return `<${tag} v-for="item in ${widget.id}Options" :key="item.value" :label="item.label" :value="item.value"/>`;
}

// 基础组件
const elTemplates: { [key: string]: any } = {
  input: (widget: DesWidgetConfigType, formConfig: DesFormConfigType) => {
    let {
      modelValue,
      disabled,
      maxLength,
      minLength,
      size,
      readonly,
      placeholder,
      type,
      rows,
      clearable
    } = getElAttr(widget, formConfig);
    return `<el-input ${modelValue} ${type} ${disabled} ${maxLength} 
      ${minLength} ${size} ${rows} ${readonly} ${placeholder} ${clearable}/>`;
  },
  "input-number": (
    widget: DesWidgetConfigType,
    formConfig: DesFormConfigType
  ) => {
    let { modelValue, disabled, size, readonly, placeholder } = getElAttr(
      widget,
      formConfig
    );
    return `<el-input-number ${modelValue}" ${disabled} ${size} ${readonly} ${placeholder} />`;
  },
  radio: (widget: DesWidgetConfigType, formConfig: DesFormConfigType) => {
    let { modelValue, disabled, size, border } = getElAttr(widget, formConfig);
    let childTemplate = buildRadioChildren(widget);
    return `<el-radio-group ${modelValue} ${size} ${disabled} ${border}>${childTemplate}</el-radio-group>`;
  },
  checkbox: (widget: DesWidgetConfigType, formConfig: DesFormConfigType) => {
    let { modelValue, disabled, size, border } = getElAttr(widget, formConfig);
    let childTemplate = buildCheckboxChildren(widget);
    return `<el-checkbox-group ${modelValue} ${size} ${disabled} ${border}>${childTemplate}</el-checkbox-group>`;
  },
  select: (widget: DesWidgetConfigType, formConfig: DesFormConfigType) => {
    let { modelValue, disabled, size, multiple, multipleLimit, clearable } =
      getElAttr(widget, formConfig);
    let childTemplate = buildSelectChildren(widget);
    return `<el-select ${modelValue} ${size} ${disabled} ${multiple} ${multipleLimit} ${clearable}>${childTemplate}</el-select>`;
  },
  "date-picker": (
    widget: DesWidgetConfigType,
    formConfig: DesFormConfigType
  ) => {
    let {
      modelValue,
      type,
      disabled,
      size,
      editable,
      format,
      clearable,
      placeholder,
      readonly,
      startPlaceholder,
      endPlaceholder
    } = getElAttr(widget, formConfig);
    return `<el-date-picker ${modelValue} ${type} ${size} ${disabled} ${editable} ${format} 
    ${clearable} ${placeholder} ${readonly} ${startPlaceholder} ${endPlaceholder}/>`;
  },
  "time-picker": (
    widget: DesWidgetConfigType,
    formConfig: DesFormConfigType
  ) => {
    let {
      modelValue,
      type,
      disabled,
      size,
      editable,
      format,
      clearable,
      placeholder,
      readonly,
      startPlaceholder,
      endPlaceholder
    } = getElAttr(widget, formConfig);
    return `<el-time-picker ${modelValue} ${type} ${size} ${disabled} ${editable} ${format} 
      ${clearable} ${placeholder} ${readonly} ${startPlaceholder} ${endPlaceholder} />`;
  },
  switch: (widget: DesWidgetConfigType, formConfig: DesFormConfigType) => {
    let { modelValue, disabled, size } = getElAttr(widget, formConfig);
    return `<el-switch ${modelValue} ${disabled} ${size} />`;
  },
  cascader: (widget: DesWidgetConfigType, formConfig: DesFormConfigType) => {
    let { modelValue, disabled, size, clearable, placeholder } = getElAttr(
      widget,
      formConfig
    );
    return `<el-autocomplete ${modelValue} ${disabled} ${size} ${clearable} ${placeholder}/>`;
  },
  rate: (widget: DesWidgetConfigType, formConfig: DesFormConfigType) => {
    let { modelValue, allowHalf, max, disabled, size, clearable } = getElAttr(
      widget,
      formConfig
    );
    return `<el-rate ${modelValue} ${max} ${disabled} ${size} ${clearable} ${allowHalf} />`;
  },
  button: (widget: DesWidgetConfigType, formConfig: DesFormConfigType) => {
    let { disabled, size } = getElAttr(widget, formConfig);
    return `<el-button ${disabled} ${size}>${widget.options.label}</el-button>`;
  },
  divider: (widget: DesWidgetConfigType, formConfig: DesFormConfigType) => {
    let { borderStyle, contentPosition, direction } = getElAttr(
      widget,
      formConfig
    );
    return `<el-divider ${borderStyle} ${contentPosition} ${direction} />`;
  },
  slider: (widget: DesWidgetConfigType, formConfig: DesFormConfigType) => {
    let { modelValue, disabled, step, showStops } = getElAttr(
      widget,
      formConfig
    );
    return `<el-slider ${modelValue} ${disabled} ${showStops} ${step} />`;
  },
  "color-picker": (
    widget: DesWidgetConfigType,
    formConfig: DesFormConfigType
  ) => {
    let { modelValue, disabled, size } = getElAttr(widget, formConfig);
    return `<el-color-picker ${modelValue} ${disabled} ${size} />`;
  },
  alert: (widget: DesWidgetConfigType, formConfig: DesFormConfigType) => {
    let { closable, showIcon, title, type } = getElAttr(widget, formConfig);
    return `<el-alert ${type} ${closable} ${showIcon} ${title}  />`;
  },
  text: (widget: DesWidgetConfigType, formConfig: DesFormConfigType) => {
    let { fontSize, size, tag, truncated, customClass } = getElAttr(
      widget,
      formConfig
    );
    return `<el-text ${fontSize} ${customClass} ${size} ${tag} ${truncated} >${widget.options.content}</el-text>`;
  }
};

function buildBasicsTemplate(
  widget: DesWidgetConfigType,
  formConfig: DesFormConfigType
) {
  return elTemplates[widget.type](widget, formConfig)
    ? elTemplates[widget.type](widget, formConfig)
    : null;
}

function buildHtmlTemplate(
  widgetList: DesWidgetConfigType[],
  formConfig: DesFormConfigType,
  templateList: string[] = []
) {
  widgetList.forEach((widget: DesWidgetConfigType) => {
    if (widget.category === "container") {
      let template = buildContainerWidget(widget, formConfig);
      templateList.push(template);
    } else {
      let template = buildFieldWidget(widget, formConfig);
      templateList.push(template);
    }
  });
  return templateList;
}

function buildFieldWidget(
  widget: DesWidgetConfigType,
  formConfig: DesFormConfigType
) {
  let { customClass, label, labelWidth, align, required } = getElAttr(
    widget,
    formConfig
  );
  let template = buildBasicsTemplate(widget, formConfig);
  if (staticTypeList.includes(widget.type)) {
    return template;
  } else {
    let propAttr = required ? `prop= "${widget.id}"` : "";
    return `<el-form-item ${customClass} ${label} ${propAttr} ${required} ${labelWidth} ${align}>${template}</el-form-item>`;
  }
}

function buildFormTemplate(
  widgetList: DesWidgetListType,
  formConfig: DesFormConfigType
) {
  let { modelName, formName, size, labelPosition, rulesName, labelWidth } =
    formConfig;
  let html = buildHtmlTemplate(widgetList, formConfig);
  let sizeAttr = size !== "default" ? `size="${size}"` : "";
  return ` <el-form ref="${formName}" :model="${modelName}" :rules="${rulesName}" ${sizeAttr}
  label-position="${labelPosition}" label-width="${labelWidth}">
  ${html.join("\n")}
  </el-form> `;
}

function buildFieldTemplate(
  widgetList: DesWidgetListType,
  formConfig: DesFormConfigType
) {
  let formTemplate = buildFormTemplate(widgetList, formConfig);
  if (formConfig.isPageType === "page") {
    return formTemplate;
  } else {
    return `<el-dialog v-model="dialogVisible" @open="open" @close="close" title="Dialog Title">${formTemplate}
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handleReset">重置表单</el-button>
        <el-button type="primary" @click="handleSubmit" >确认</el-button>
        </span>
      </template>
    </el-dialog>`;
  }
}

export function getSFCGenerator(
  formConfig: DesFormConfigType,
  widgetList: DesWidgetListType
) {
  let html = buildFieldTemplate(widgetList, formConfig);
  let js = genVue3JS(formConfig, widgetList);
  let localStyle = "";
  let sfcTemplate = `
  <template>
  ${html}
  </template>

  <script setup>
  ${js}
  </script>

  <style>
  ${formConfig.cssCode}
  </style> 

  <style lang="scss" scoped>
  ${localStyle}
  </style>`;
  return sfcTemplate;
}
