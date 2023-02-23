import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const { VITE_PROXY_URL } = loadEnv(mode, process.cwd(), "");
  let proxy = {};
  if (command === "serve") {
    proxy = {
      "/api": {
        target: VITE_PROXY_URL,
        changeOrigin: true,
      },
    };
  }
  return {
    // 插件
    plugins: [
      vue(),
      // https://github.com/anncwb/vite-plugin-svg-icons
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), "src/assets/svg")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    // 配置路径别名
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@assets": resolve(__dirname, "src/assets"),
        "@api": resolve(__dirname, "src/api"),
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
    server: {
      host: "0.0.0.0",
      port: 8080,
      open: false,
      proxy: proxy,
    },
  };
});
