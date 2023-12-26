## 介绍

Exercise Form是一款vue3低代码表单，基于Element Plus组件库，借鉴[Variant Form](https://vform666.com/)表单。

Exercise Form由表单设计器ExFormDesigner和表单渲染器ExFormRender两部构成，ExFormDesigner通过拖拽组件方式生成JSON格式的表单对象，
ExFormRender负责将表单JSON渲染为Vue组件。其中还导出有代码编辑ExCodeEditor组件可使用。

Exercise Form提供了丰富的组件属性设置、表单交互事件和API方法，并且为开发者预留了拓展组件库的二次开发接口。

[项目演示](https://pxhnice.github.io/exercise-form.github.io/)

## 安装

> 由于该组件基于Element Plus搭建，使用前请先安装[Element Plus](https://element-plus.org/zh-CN/guide/installation.html)、
> 组件[图标](https://element-plus.org/zh-CN/component/icon.html)，再安装该组件，安装如下。

::: code-group
```bash [npm]
 npm install exercise-form
```
```bash [pnpm]
 pnpm add exercise-form
```
:::

## 开始


```ts
//main.ts
import { createApp } from 'vue'
// 组件引入
import ElementPlus from 'element-plus'
import ExerciseForm from "exercise-form"
// 样式引入
import 'element-plus/dist/index.css'
import 'exercise-form/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(ExerciseForm)
app.mount('#app')
```
