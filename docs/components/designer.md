# From Designer 表单构建器

## 基础用法

```vue
<template>
  <ex-form-designer :form-data="formData" :form-json="formJson" />
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";

const formData = ref({}); //表单数据
const formJson = reactive({
  formConfig: {}, //表单设置
  widgetList: [] //组件列表
});
</script>
```

## 主题

> 该组件主题基于[Element Plus](https://element-plus.org/zh-CN/guide/theming.html)搭建,可以根据改变Element全局 --el-color-primary实现，
> 当项目有实现Element Plus主题业务时，就无需使用该themeColor属性。

#### 如何使用

```html
<ex-form-designer :theme-color="color" />
```


## 黑夜模式

> 由于部分Element Plus组件使用Teleport被插入到body下，导致无法修改样式，当组件teleport属性设置false会导致页面组件显示不全，
> 所以推荐使用[Element Plus](https://element-plus.org/zh-CN/guide/dark-mode.html)黑夜模式设置。
> 因[vue-codemirror](https://www.npmjs.com/package/vue-codemirror)编辑器插件黑夜模式与Element Plus无关，还需开启组件黑夜模式。

```html
<ex-form-designer dark />
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
      <td>form-data</td>
      <td>表单数据</td>
      <td>object</td>
      <td>{}</td>
    </tr>
    <tr>
      <td>form-json</td>
      <td>构建器对象</td>
      <td>object</td>
      <td>{widgetList:[], formConfig:{配置如下}}</td>
    </tr>
    <tr>
      <td>options-data</td>
      <td>构造器配置</td>
      <td>object</td>
      <td>配置如下</td>
    </tr>
    <tr>
      <td>banned-widgets</td>
      <td>禁用组件</td>
      <td>Array/cname</td>
      <td>[] 例:["input"]</td>
    </tr>
    <tr>
      <td>theme-color</td>
      <td>主题颜色</td>
      <td>string</td>
      <td>#409eff</td>
    </tr>
    <tr>
      <td>dark</td>
      <td>黑夜模式</td>
      <td>boolean</td>
      <td>false</td>
    </tr>
  </table>

<table>
  <tr>
      <th>属性名</th>
      <th>属性配置</th>
    </tr>
  <tr>
      <td>formConfig</td>
      <td>{<br>
        <span> &emsp;size: "default"</span><br>
        <span> &emsp;labelPosition: "left"</span><br>
        <span> &emsp;align: "left"</span><br>
        <span> &emsp;labelWidth: 100</span><br>
        <span> &emsp;modelName: "formData"</span><br>
        <span> &emsp;formName: "formRef"</span><br>
        <span> &emsp;patternType: "pc"</span><br>
        <span> &emsp;isPageType: "page"</span><br>
        <span> &emsp;hideRequiredAsterisk: false</span><br>
        <span> &emsp;cssCode: ""</span><br>
        <span> &emsp;customClass: []</span><br>
        <span> &emsp;functions: ""</span><br>
        <span> &emsp;onFormCreated: ""</span><br>
        <span> &emsp;onFormMounted: ""</span><br>
        <span> &emsp;onFormDataChange: ""</span><br>
      }
      </td>
    </tr>
   <tr>
      <td>options-data</td><td>{<br>
        <span> &emsp;templateButton: false, //模版栏</span><br>
        <span> &emsp;treeFormButton: true, //表单树形按钮</span><br>
        <span> &emsp;previewFormButton: true, //预览表单按钮</span><br>
        <span> &emsp;exportJsonButton: true, //JSON按钮</span><br>
        <span> &emsp;exportCodeButton: true, //代码按钮</span><br>
        <span> &emsp;generateSFCButton: true, //生成SFC按钮</span><br>
        <span> &emsp;pageTypeButton: true, //页面类型按钮</span><br>
        <span> &emsp;copyDataButton: true, //复制按钮</span><br>
        <span> &emsp;saveFileButton: true, //文件按钮</span><br>
        <span> &emsp;resetFormJson: false //重置表单为空</span><br>
      }
      </td>
    </tr>
</table>