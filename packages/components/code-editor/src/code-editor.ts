import type { CSSProperties } from "vue";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { vue } from "@codemirror/lang-vue";
import { json } from "@codemirror/lang-json";
import { css } from "@codemirror/lang-css";
import { definePropType } from "@exercise-form/utils";

export const codeEditorEmits = {
  "update:modelValue": (val: string) => val
};

const codeLangType = ["javascript", "html", "css", "json", "vue"] as const;

export const codeEditoirProps = {
  modelValue: {
    type: String
  },
  height: {
    type: [Number, String],
    default: "300"
  },
  codeStyle: {
    type: definePropType<CSSProperties>({})
  },
  lang: {
    type: String,
    values: codeLangType,
    default: "javascript"
  },
  disabled: Boolean
};

export const langs: { [key: string]: any } = {
  json: json(),
  html: html(),
  css: css(),
  vue: vue(),
  javascript: javascript()
};
