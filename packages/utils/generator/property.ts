import type { DesWidget, DesFormConfig } from "@exercise-form/constants";

const getAccept = (fileTypes: string[]) => {
  return fileTypes.map((t: string) => "." + t).join(",");
};

export function getElAttr(widget: DesWidget, formConfig: DesFormConfig) {
  let wop = widget.options;
  return {
    modelValue: `v-model="${formConfig.modelName}.${wop.name}"`,
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
    size: wop.size && wop.size !== "default" ? `size="${wop.size}"` : "",
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
    //
    span: wop.span ? `:span="${wop.span}"` : "",
    md: wop.md ? `:md="${wop.md}"` : "",
    sm: wop.sm ? `:sm="${wop.sm}"` : "",
    xs: wop.xs ? `:xs="${wop.xs}"` : "",
    offset: wop.offset ? `:offset="${wop.offset}"` : "",
    push: wop.push ? `:push="${wop.push}"` : "",
    pull: wop.pull ? `:pull="${wop.pull}"` : "",

    colspan: wop.colspan > 1 ? `:colspan="${wop.colspan}"` : "",
    rowspan: wop.rowspan > 1 ? `:rowspan="${wop.rowspan}"` : "",

    shadow: wop.shadow ? `:shadow="true"` : "",
    cardWidth: wop.cardWidth ? `style="width:${wop.cardWidth};"` : "",
    tableWidth: wop.tableWidth ? `style="width:${wop.tableWidth};"` : "",
    showHeader: wop.showHeader ? "show-header" : "",
    fit: wop.fit ? "fit" : "",
    height: wop.height ? `height=${wop.height}` : "",
    highlightCurrentRow: wop.highlightCurrentRow ? `highlight-current-row` : "",
    operationWidth: wop.operationWidth ? `width="${wop.operationWidth}"` : "",
    operationLabel: wop.operationLabel ? `label="${wop.operationLabel}"` : "",
    operationFixed: wop.operationFixed ? `fixed="${wop.operationFixed}"` : "",
    operationAlign:
      wop.operationAlign && wop.operationAlign != "left"
        ? `align="${wop.operationAlign}"`
        : "",
    closeOnClickModal: !wop.closeOnClickModal
      ? `:close-on-click-modal="${wop.closeOnClickModal}`
      : "",
    closeOnPressEscape: !wop.closeOnPressEscape
      ? `:close-on-press-escape="${wop.closeOnPressEscape}"`
      : "",
    showClose: !wop.showClose ? `:show-close=${wop.showClose}` : "",
    modal: !wop.modal ? `:modal="${wop.modal}"` : "",

    width: wop.width ? `width=${wop.width}` : "",
    nodeKey: wop.nodeKey ? `node-key=${wop.nodeKey}` : "",
    draggable: wop.draggable ? "draggable" : "",
    defaultExpandAll: wop.defaultExpandAll ? "default-expand-all" : "",
    lazy: wop.lazy ? "lazy" : "",
    props: wop.props ? `:props=${wop.props}` : "",
    showLinkage: wop.showLinkage ? "show-linkage" : "",

    action: wop.action ? `action="${wop.action}"` : "",
    accept:
      wop.fileTypes && wop.fileTypes.length > 0
        ? `accept="${getAccept(wop.fileTypes)}"`
        : "",
    method: wop.method != "POST" ? `method="${wop.method}"` : "",
    limit: wop.limit ? `:limit="${wop.limit}"` : "",
    data: wop.data ? `:data="${wop.name}data"` : "",
    headers: wop.headers ? `:headers="${wop.name}headers"` : "",

    customClass:
      wop.customClass && wop.customClass.length > 0
        ? `class="${wop.customClass.join(" ")}"`
        : ""
  };
}
