# 表单构建器

## 基础用法


```vue
<template>
  <ex-form-designer :form-data="formData" :form-json="formJson" />
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { DesFormJsonType } from "exercise-form";

const formData = ref({}); //表单数据
const formJson = reactive<DesFormJsonType>({
  formConfig: {}, //表单设置
  widgetList: [] //组件列表
});
</script>
```
::: warning
使用时注意构建器高度问题，默认高度`100v`，自定义高度更改`style`即可。
:::

## 主题

> 该组件主题基于[Element Plus](https://element-plus.org/zh-CN/guide/theming.html)搭建,可以根据改变Element全局 `--el-color-primary`实现，
> 当项目有实现Element Plus主题业务时，就无需使用该`themeColor`属性。

#### 如何使用

```html
<ex-form-designer :theme-color="color" />
```

## 黑夜模式

> 由于部分Element Plus组件使用Teleport被插入到body下，导致无法修改样式，当组件`teleport`属性设置`false`会导致页面组件显示不全，
> 所以推荐使用[Element Plus](https://element-plus.org/zh-CN/guide/dark-mode.html)黑夜模式设置。
> 因[vue-codemirror](https://www.npmjs.com/package/vue-codemirror)编辑器插件黑夜模式与Element Plus无关，还需开启组件黑夜模式。

```html
<ex-form-designer dark />
```

## 属性参数

| 属性名           | 描述           |  类型   |  默认值   |
| ---------------- | -------------- | :-----: | :-------: |
| `form-data`      | 表单数据       | object  |     -     |
| `form-json`      | 构建器数据     | object  |     -     |
| `options-data`   | 构造器按钮配置 | object  |     -     |
| `banned-widgets` | 禁用组件       |  array  |     -     |
| `theme-color`    | 主题颜色       | string  | `#409eff` |
| `dark`           | 黑夜模式       | boolean |   false   |

#### formConfig

下面是formConfig自定义参数说明，已有参数请参考[el-form](https://element-plus.org/zh-CN/component/form.html#form-attributes)属性配置。

| 参数          | 描述            |  类型  | 默认值 |
| ------------- | --------------- | :----: | :----: |
| `patternType` | 构造器模式      | string |   pc   |
| `isPageType`  | 页面类型        | string |  page  |
| `cssCode`     | 样式代码片段    | string |   -    |
| `customClass` | `className`列表 | array  |   -    |

#### optionsData

下面是关于构造器按钮配置说明。

| 参数                | 描述                         |  类型   | 默认值 |
| ------------------- | ---------------------------- | :-----: | :----: |
| `templateButton`    | 是否显示模版栏               | boolean |  true  |
| `treeFormButton`    | 是否显示表单树形按钮         | boolean |  true  |
| `previewFormButton` | 是否显示预览表单按钮         | boolean |  true  |
| `exportJsonButton`  | 是否显示导出JSON按钮         | boolean |  true  |
| `exportCodeButton`  | 是否显示导出代码按钮         | boolean |  true  |
| `generateSFCButton` | 是否显示生成SFC按钮          | boolean |  true  |
| `pageTypeButton`    | 是否显示导出页面类型按钮     | boolean |  true  |
| `copyDataButton`    | 是否显示复制按钮             | boolean |  true  |
| `saveFileButton`    | 是否显示导出文件按钮         | boolean |  true  |
| `resetFormJson`     | 是否显示初始化时重置表单为空 | boolean | false  |