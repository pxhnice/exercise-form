// 操作权限
import type { Directive, DirectiveBinding } from "vue";

interface ElType extends HTMLElement {
  permissions: [];
  permission_key: [];
}

const hasPermission: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    const all_permission = "*";
    el.permissions = [];
    el.permission_key = binding.value;
    const hasPermission = el.permissions.some((permission) => {
      return (
        all_permission === permission || el.permission_key.includes(permission)
      );
    });
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  }
};

export default hasPermission;
