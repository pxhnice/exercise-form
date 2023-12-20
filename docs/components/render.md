# From Designer 表单构建器 

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

const vFormRenderRef = ref()
const formConfig = ref({}) //表单数据
const widgetList = ref([]) //组件列表
</script>
```
## 属性参数

<table>
    <tr>
      <th>属性名</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
    <tr>
      <td>form-config</td>
      <td>表单设置参数对象</td>
      <td>object</td>
      <td>{}</td>
    </tr>
    <tr>
      <td>widget-list</td>
      <td>组件列表数据</td>
      <td>array</td>
      <td>[]</td>
    </tr>
  </table>
