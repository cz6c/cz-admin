// .commitlintrc.js
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// precomputed scope
const scopeComplete = execSync("git status --porcelain || true")
  .toString()
  .trim()
  .split("\n")
  .find(r => ~r.indexOf("M  src"))
  ?.replace(/(\/)/g, "%%")
  ?.match(/src%%((\w|-)*)/)?.[1];

const scopes = fs
  .readdirSync(path.resolve(__dirname, "src"), { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name.replace(/s$/, ""));

/** @type {import('cz-git').UserConfig} */
module.exports = {
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 108],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    "subject-case": [0],
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "perf",
        "style",
        "docs",
        "test",
        "refactor",
        "build",
        "ci",
        "chore",
        "revert",
        "wip",
        "workflow",
        "types",
        "release",
      ],
    ],
  },
  extends: ["@commitlint/config-conventional"],
  prompt: {
    alias: { fd: "docs: fix typos" },
    //设置 选择范围 中 为空选项(empty) 和 自定义选项(custom) 的 位置
    customScopesAlign: !scopeComplete ? "top" : "bottom",
    // 自动获取 “代码修改范围”。 适用于存在很多范围选项（例如组件库、monorepo）的情况。
    defaultScope: scopeComplete,
    // 自定义选择 模块范围 命令行显示信息
    scopes: [...scopes, "mock"],
    // 是否在选择 ISSUE 前缀 显示为跳过选项(skip)
    allowEmptyIssuePrefix: false,
    // 是否在选择 ISSUE 前缀 显示自定义选项(custom)
    allowCustomIssuePrefix: false,
    customScopesAlias: "custom    自定义",
    emptyScopesAlias: "empty    不填写",
    messages: {
      type: "选择你要提交的类型 :",
      scope: "选择一个提交范围（可选）:",
      customScope: "请输入自定义的提交范围 :",
      subject: "填写简短精炼的变更描述 :\n",
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixesSelect: "选择关联issue前缀（可选）:",
      customFooterPrefix: "输入自定义issue前缀 :",
      footer: "列举关联issue (可选) 例如: #31, #I3244 :\n",
      confirmCommit: "是否提交或修改commit ?",
    },
    types: [
      { value: "feat", name: "feat:    新增功能" },
      { value: "fix", name: "fix:    修复缺陷" },
      { value: "docs", name: "docs:    文档变更" },
      { value: "style", name: "style:    代码格式 | 不影响代码含义的改动" },
      { value: "refactor", name: "refactor:    代码重构 | 既不修复错误也不添加功能的代码更改" },
      { value: "perf", name: "perf:    性能优化" },
      { value: "test", name: "test:    测试相关 | 添加缺失的测试或更正现有测试" },
      { value: "build", name: "build:    构建相关 | 构建流程、外部依赖变更 (如升级 npm 包、修改打包配置等)" },
      { value: "ci", name: "ci:    持续集成 | 修改 CI 配置、脚本" },
      { value: "revert", name: "revert:    回退代码 | 回滚 commit" },
      { value: "chore", name: "chore:    其他修改 | 对构建过程或辅助工具和库的更改 (不影响源文件、测试用例)" },
      { value: "wip", name: "wip:    正在开发中" },
      { value: "types", name: "types:    类型定义文件修改" },
    ],
  },
};
