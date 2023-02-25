import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

// 问题描述
// 1. `import.meta.globEager` 已被弃用, 需要升级vite版本,有兼容问题
// 2. `vite-plugin-mock` 插件问题 https://github.com/vbenjs/vite-plugin-mock/issues/56

const modules: Record<string, any> = (import.meta as any).glob("./**/*.ts", {
  import: "default",
  eager: true,
});

const mockModules = Object.keys(modules).reduce((pre, key) => {
  if (!key.includes("/_")) {
    pre.push(...modules[key]);
  }
  return pre;
}, [] as any[]);

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
