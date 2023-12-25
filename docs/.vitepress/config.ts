import type { UserConfig } from "vitepress";

export const config: UserConfig = {
  title: "Exercise Form",
  description: "a Vue 3 based component library for designers and developers",
  lastUpdated: true,
  base: "/exercise-form-docs.github.io/",
  head: [
    // 图标配置
    [
      "link",
      { rel: "icon", href: "/exercise-form-docs.github.io/images/logo.svg" }
    ]
  ],
  themeConfig: {
    logo: "/images/logo.svg",
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-PRESENT vangleer and Vangle contributors"
    },
    nav: [
      { text: "指南", link: "/guide/design" },
      { text: "组件", link: "/components/designer" }
    ],
    socialLinks: [
      { icon: "github", link: "https://gitee.com/pxhgood/exercise-form.git" }
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Components",
          items: [
            {
              text: "FormDesigner",
              link: "/components/designer"
            },
            {
              text: "FormRender",
              link: "/components/render"
            },
            {
              text: "CodeEditor",
              link: "/components/code"
            }
            // {
            //   text: "SvgIcon",
            //   link: "/components/icon"
            // }
          ]
        }
      ],
      "/components/": [
        {
          text: "Components",
          items: [
            {
              text: "FormDesigner",
              link: "/components/designer"
            },
            {
              text: "FormRender",
              link: "/components/render"
            },
            {
              text: "CodeEditor",
              link: "/components/code"
            }
            // {
            //   text: "SvgIcon",
            //   link: "/components/icon"
            // }
          ]
        }
      ]
    }
  }
};

export default config;
