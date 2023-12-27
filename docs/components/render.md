# 表单渲染器 

## 基础用法

```vue
<template> 
  <ex-form-render
    ref="vFormRenderRef"
    :widget-list="widgetList"
    :form-config="formConfig"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue"
import type { DesWidgetListType, DesFormConfigType } from "exercise-form"

const vFormRenderRef = ref()
const formConfig = ref<DesFormConfigType>({}) //表单数据
const widgetList = ref<DesWidgetListType>([]) //组件列表
</script>
```

## 属性参数

| 属性名        | 描述         |  类型  | 默认值 |
| ------------- | ------------ | :----: | :----: |
| `form-config` | 表单设置参数 | object |   -    |
| `widget-list` | 列表数据     | array  |   -    |