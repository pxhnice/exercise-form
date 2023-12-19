import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { vue } from "@codemirror/lang-vue";
import { definePropType } from "@exercise-form/utils";

import type { CSSProperties } from "vue";
export const codeEditorEmits = {
  "update:modelValue": (val: string) => val
};

const codeLangType = ["javascript", "html", "css", "json", "vue"] as const;

export const codeEditorProps = {
  /**
   * @description  绑定值
   */
  modelValue: {
    type: String
  },
  /**
   * @description 高度
   */
  height: {
    type: [Number, String],
    default: "300"
  },
  /**
   * @description vue-codemirror组件自定义样式
   */
  codeStyle: {
    type: definePropType<CSSProperties>({})
  },
  /**
   * @description vue-codemirror使用语言
   */
  lang: {
    type: String,
    values: codeLangType,
    default: "javascript"
  },
  /**
   * @description 禁用
   */
  disabled: Boolean,
  dark: Boolean
};

export const langs: { [key: string]: any } = {
  json: json(),
  html: html(),
  css: css(),
  vue: vue(),
  javascript: javascript()
};
