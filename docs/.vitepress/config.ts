import type { UserConfig } from "vitepress";

export const config: UserConfig = {
  title: "ExForm",
  description: "a Vue 3 based component library for designers and developers",
  themeConfig: {
    logo: "/images/vite.svg",
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-PRESENT vangleer and Vangle contributors"
    },
    algolia: {
      apiKey: "your_api_key",
      indexName: "index_name"
    },
    nav: [
      { text: "指南", link: "/guide/design" },
      { text: "组件", link: "/components/form-designer" }
    ],
    socialLinks: [
      { icon: "github", link: "https://gitee.com/pxhgood/exercise-form.git" }
    ],
    sidebar: {
      "/guide/": [
        {
          text: "基础",
          items: [
            { 
              text: "设计", 
              link: "/guide/design" },
            {
              text: "安装",
              link: "/guide/install"
            },
            {
              text: "主题",
              link: "/guide/theme"
            },
            {
              text: "黑夜模式",
              link: "/guide/dark"
            }
          ]
        }
      ],
      "/components/": [
        {
          text: "基础组件",
          items: [
            {
              text: "Form Designer",
              link: "/components/form-designer"
            },
            {
              text: "Form Render",
              link: "/components/form-render"
            },
            {
              text: "Code Editor",
              link: "/components/code-editor"
            },
            {
              text: "Svg Icon",
              link: "/components/svg-icon"
            }
          ]
        }
      ]
    }
  }
};

export default config;
