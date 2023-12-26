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
    ]
  ],
  themeConfig: {
    lang: "en-US",
    searchParameters: {
      facetFilters: ["lang:en-US"]
    },
    logo: "/images/logo.svg",
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-PRESENT"
    },
    // search: {
    //   // provider: 'local', // 可以开启本地搜索
    //   provider: "algolia",
    //   options: {
    //     appId: "PPE3KXB4ZS",
    //     apiKey: "15a9e3babd03b811492c75273937e54d",
    //     indexName: "exercise-form",
    //     placeholder: "请输入关键词",
    //     translations: {
    //       button: {
    //         buttonText: "请输入关键词"
    //       }
    //     }
    //   }
    // },
    algolia: {
      appId: "PPE3KXB4ZS",
      apiKey: "15a9e3babd03b811492c75273937e54d",
      indexName: "exercise-form",
      placeholder: "请输入关键词",
      buttonText: "搜索"
    },
    outline: {
      label: "本页目录"
    },
    editLink: {
      pattern: "https://gitee.com/pxhgood/exercise-form/blob/master/docs/:path",
      text: "为此页提供修改建议"
    },
    lastUpdated: {
      text: "最后更新时间"
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇"
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
          ]
        }
      ]
    }
  }
};

export default config;
