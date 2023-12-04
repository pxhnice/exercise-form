module.exports = {
  // 注册 stylelint 的 prettier 插件
  plugins: ["stylelint-prettier"],
  // 继承一系列规则集合
  extends: [
    // standard 规则集合
    "stylelint-config-standard",
    "stylelint-config-recommended-scss",
    // 样式属性顺序规则
    // "stylelint-config-recess-order",
    // 接入 Prettier 规则
    "stylelint-config-prettier",
    "stylelint-prettier/recommended"
  ],
  // 配置 rules
  rules: {
    // 开启 Prettier 自动格式化功能
    "prettier/prettier": true,
    "no-empty-source": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["deep"]
      }
    ],
    "selector-type-no-unknown": null,
    "selector-max-compound-selectors": null,
    "selector-no-qualifying-type": null,
    "selector-class-pattern": null
  }
};
