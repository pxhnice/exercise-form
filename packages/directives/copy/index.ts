import type { Directive, DirectiveBinding } from "vue";
import { onMessageSuccess, onMessageError } from "@exercise-form/utils";

export interface ElCopyType extends HTMLElement {
  copyData: string | number;
  _handleClick_: any;
}

const copy: Directive = {
  beforeMount(el: ElCopyType, binding: DirectiveBinding) {
    el.copyData = binding.value;
    el.addEventListener("click", handleClick);
  },
  updated(el: ElCopyType, binding: DirectiveBinding) {
    el.copyData = binding.value;
  },
  beforeUnmount(el: ElCopyType) {
    el.removeEventListener("click", handleClick);
  }
};

function handleClick(this: any) {
  try {
    const input = document.createElement("input");
    input.style.opacity = "0";
    input.value = this.copyData.toLocaleString();
    document.body.appendChild(input);
    input.select();
    document.execCommand("Copy");
    document.body.removeChild(input);
    onMessageSuccess("复制成功");
  } catch (error) {
    onMessageError("复制失败");
  }
}

export default copy;
