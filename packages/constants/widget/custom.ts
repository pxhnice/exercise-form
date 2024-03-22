import { DesFormWidget } from "@exercise-form/core";

export const customs = [
  {
    name: "提示",
    iconName: "alert",
    type: "alert",
    options: {
      closable: false,
      customClass: "",
      description: "more text description",
      hidden: false,
      name: "",
      showIcon: false,
      type: "info",
      title: "title"
    }
  },
  {
    name: "静态文字",
    iconName: "text",
    type: "text",
    options: {
      customClass: "",
      content: "静态文字",
      fontSize: "14px",
      hidden: false,
      name: "",
      size: "default",
      tag: "span",
      truncated: false,
      type: ""
    }
  }
] as DesFormWidget[];
