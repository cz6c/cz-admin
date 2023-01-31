import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // 插件
  plugins: [vue()],
  // 配置路径别名
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@asstes": resolve(__dirname, "src/asstes"),
      "@coms": resolve(__dirname, "src/components"),
      "@hooks": resolve(__dirname, "src/hooks"),
      "@store": resolve(__dirname, "src/store"),
      "@utils": resolve(__dirname, "src/utils"),
      "@views": resolve(__dirname, "src/views"),
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
