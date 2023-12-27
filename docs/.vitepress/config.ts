import type { UserConfig } from "vitepress";

export const config: UserConfig = {
  title: "Exercise Form",
  description: "a Vue 3 based component library for designers and developers",
  lastUpdated: true,
  base: "/exercise-form-docs.github.io/",
  head: [
    [
      "link",
      { rel: "icon", href: "/exercise-form-docs.github.io/images/logo.svg" }
    ],
    [
      "meat",
      { rel: "icon", href: "/exercise-form-docs.github.io/images/logo.svg" }
    ]
  ],
  themeConfig: {
    logo: "/images/logo.svg",
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-PRESENT"
    },
    search: {
      center: "right",
      provider: "local", // 可以开启本地搜索
      // provider: "algolia",
      options: {
        // appId: "PPE3KXB4ZS",
        // apiKey: "15a9e3babd03b811492c75273937e54d",
        // indexName: "exercise-form",
        placeholder: "请输入关键词",
        translations: {
          button: {
            buttonText: "请输入关键词"
          }
        }
      }
    },
    outline: {
      label: "本页目录"
    },
    editLink: {
      pattern: "https://gitee.com/pxhgood/exercise-form/blob/master/docs/:path",
      text: "为此页提供修改建议"
    },
    lastUpdated: {
      text: "上次更新"
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇"
    },
    nav: [
      { text: "指南", link: "/guide/design" },
      { text: "组件", link: "/components/designer" },
      {
        text: "V0.0.0-dev.1",
        items: [
          {
            text: "版本发布",
            link: "https://gitee.com/pxhgood/exercise-form.git"
          }
        ]
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://gitee.com/pxhgood/exercise-form.git" }
    ],
    sidebar: {
      "/guide/": [
        {
          text: "指南",
          items: [
            {
              text: "Form Designer 表单构建器",
              link: "/components/designer"
            },
            {
              text: "Form Render 表单渲染器",
              link: "/components/render"
            },
            {
              text: "CodeEditor 代码编辑器",
              link: "/components/code"
            }
          ]
        }
      ],
      "/components/": [
        {
          text: "组件",
          items: [
            {
              text: "Form Designer 表单构建器",
              link: "/components/designer"
            },
            {
              text: "Form Render 表单渲染器",
              link: "/components/render"
            },
            {
              text: "Code Editor 代码编辑器",
              link: "/components/code"
            }
          ]
        }
      ]
    }
  }
};

export default config;
