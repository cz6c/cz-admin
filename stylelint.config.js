module.exports = {
  root: true,
  /* 使用排序插件 */
  plugins: ["stylelint-order"],
  /* 继承某些已有的规则 */
  extends: [
    /* 打开额外的规则来执行在规范和一些 CSS 样式指南中发现的通用约定 */
    "stylelint-config-standard",
    /* 扩展 scss */
    "stylelint-config-standard-scss",
    /*  配置 vue 中 scss 样式格式化 */
    "stylelint-config-recommended-vue/scss",
    /* 配置 vue 中 template 样式格式化 */
    "stylelint-config-html/vue",
    /* 关闭所有不必要的或可能与 Prettier 冲突的规则 */
    "stylelint-config-prettier",
  ],
  ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts", "**/*.json", "**/*.md"],
  /* 不同格式的文件指定自定义语法 */
  overrides: [
    {
      files: ["*.vue", "**/*.vue", "*.html", "**/*.html"],
      customSyntax: "postcss-html",
      rules: {
        "keyframes-name-pattern": null,
        "selector-pseudo-class-no-unknown": [
          true,
          {
            ignorePseudoClasses: ["deep", "global"],
          },
        ],
        "selector-pseudo-element-no-unknown": [
          true,
          {
            ignorePseudoElements: ["v-deep", "v-global", "v-slotted"],
          },
        ],
      },
    },
    {
      files: ["*.scss", "**/*.scss"],
      customSyntax: "postcss-scss",
    },
  ],
  /* https://stylelint.io/user-guide/rules */
  rules: {
    "value-keyword-case": null, // 在 css 中使用 v-bind，不报错
    "no-descending-specificity": null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    "function-url-quotes": "always", // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    "font-family-no-missing-generic-family-keyword": null, // 禁止在字体族名称列表中缺少通用字体族关键字
    "property-no-unknown": null, // 禁止未知的属性(true 为不允许)
    "no-empty-source": null, // 禁止空源码
    "selector-class-pattern": null, // 强制选择器类名的格式
    "scss/at-import-partial-extension": null, // 解决不能引入scss文件
    "value-no-vendor-prefix": null, // 关闭 vendor-prefix(为了解决多行省略 -webkit-box)
    "function-no-unknown": null, //此规则将 CSS 规范中定义的函数视为已知函数。
    "named-grid-areas-no-invalid": null, // 禁止不允许无效的命名网格区域
    "unit-no-unknown": [true, { ignoreUnits: ["rpx"] }], // 不允许未知单位。扩展小程序单位
    // 要求或禁止在规则之前的空行 "always(规则之前必须始终有一个空行)"
    "rule-empty-line-before": [
      "always",
      {
        ignore: ["after-comment", "first-nested"],
      },
    ],
    // 不允许未知的伪类选择器。
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global", "deep"],
      },
    ],
    // 不允许未知的伪元素选择器。
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep"],
      },
    ],
    // 不允许未知的规则
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "function",
          "if",
          "each",
          "include",
          "mixin",
        ],
      },
    ],
    // 排序插件相关
    /* 指定声明块中内容的顺序 https://github.com/hudochenkov/stylelint-order/tree/master/rules/order */
    "order/order": [
      [
        "dollar-variables", // $
        "custom-properties", // --
        "at-rules", // @
        "declarations", // CSS 声明（例如，display: block）
        // 扩展 @media
        {
          type: "at-rule",
          name: "media",
        },
        "rules", //  嵌套规则（例如，a { span {} }）
      ],
    ],
    /* order/properties-order：指定声明块中属性的顺序。*/
    "order/properties-order": [
      // 定位
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",
      // 显示与浮动
      "display",
      "justify-content",
      "align-items",
      "float",
      "clear",
      "overflow",
      "overflow-x",
      "overflow-y",
      // 边框相关属性
      "margin",
      "margin-top",
      "margin-right",
      "margin-bottom",
      "margin-left",
      "border",
      "border-style",
      "border-width",
      "border-color",
      "border-top",
      "border-top-style",
      "border-top-width",
      "border-top-color",
      "border-right",
      "border-right-style",
      "border-right-width",
      "border-right-color",
      "border-bottom",
      "border-bottom-style",
      "border-bottom-width",
      "border-bottom-color",
      "border-left",
      "border-left-style",
      "border-left-width",
      "border-left-color",
      "border-radius",
      "padding",
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left",
      // 尺寸
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
      // 字体样式
      "font-size",
      "font-family",
      "font-weight",
      "text-align",
      "text-justify",
      "text-indent",
      "text-overflow",
      "text-decoration",
      "white-space",
      "color",
      // 背景
      "background",
      "background-position",
      "background-repeat",
      "background-size",
      "background-color",
      "background-clip",
      // 其他
      "opacity",
      "filter",
      "list-style",
      "outline",
      "visibility",
      "box-shadow",
      "text-shadow",
      "resize",
      "transition",
    ],
  },
};
