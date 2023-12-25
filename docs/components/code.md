# 代码编辑器

## 基础用法

```vue
<template> 
  <ex-code-editor v-model="codeValue" />
</template>
<script lang="ts" setup>
import { ref } from "vue"

const codeValue = ref()
</script>
```
## 属性参数

| 属性名       | 描述     |  类型   |   默认值   |
| ------------ | -------- | :-----: | :--------: |
| `v-model`    | 绑定数据 | string  |     -      |
| `code-style` | 样式     | object  |     -      |
| `lang`       | 语言     | string  | javascript |
| `disabled`   | 禁用     | boolean |   false    |
| `dark`       | 黑夜模式 | boolean |   false    |