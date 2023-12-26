import DefaultTheme from "vitepress/theme";
import VpApp from "../vitepress";
import "./custom.scss";

export default {
  ...DefaultTheme,
  // Layout: VpApp,
  NotFound: () => "404", // <- this is a Vue 3 functional component
  enhanceApp({ app, router, siteData }) {}
  // Layout: () => {
  //   return h(
  //     DefaultTheme.Layout,
  //     {},
  //     {
  //       "doc-after": () => h(docAfter)
  //     }
  //   );
  // }
};
