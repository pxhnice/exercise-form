# 图标
> Exercise Form构建器导出的组件，在注册时已经全局注册，可以全局使用

## 基础用法

```sh
npn install vite-plugin-svg-icons
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import path from "node:path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

export default defineConfig({
  plugins: [
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "svg文件路径")],
      symbolId: "icon-[name]"
    })
  ]
});
```

```vue
<template>
  <ex-svg-icon name="copy"/>
</template>
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
      <td>name</td>
      <td>图标名称</td>
      <td>string</td>
      <td>—</td>
    </tr>
    <tr>
      <td>class</td>
      <td>属性名</td>
      <td>string</td>
      <td>—</td>
    </tr>
  </table>
