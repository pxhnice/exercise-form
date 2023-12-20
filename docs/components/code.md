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

<table>
    <tr>
      <th>属性名</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
    <tr>
      <td>v-model</td>
      <td>编辑器数据</td>
      <td>string</td>
      <td>—</td>
    </tr>
    <tr>
      <td>code-style</td>
      <td>样式</td>
      <td>object</td>
      <td>—</td>
    </tr>
     <tr>
      <td>lang</td>
      <td>编辑器语言</td>
      <td>string</td>
      <td>javascript</td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>禁用</td>
      <td>boolean</td>
      <td>false</td>
    </tr>
      <tr>
      <td>dark</td>
      <td>黑夜模式</td>
      <td>boolean</td>
      <td>false</td>
    </tr>
  </table>
