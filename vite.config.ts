import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");
const resolve = (dir: string): string => {
  return path.resolve(__dirname, dir);
};

// https://vitejs.dev/config/
export default defineConfig({
  // 插件
  plugins: [vue()],
  // 配置路径别名
  resolve: {
    alias: {
      "@": resolve("src"),
      "@asstes": resolve("src/asstes"),
      "@coms": resolve("src/components"),
    },
  },
  css: {
    preprocessorOptions: {
      // 配置全局scss文件
      scss: {
        additionalData: '@import "@/assets/style/variables.scss";',
      },
    },
  },
});
