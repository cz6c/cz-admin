/* eslint-disable prettier/prettier */
import { UserConfigExport, ConfigEnv, loadEnv } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import { createHtmlPlugin } from "vite-plugin-html";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const { VITE_PUBLIC_PATH, VITE_PORT, VITE_BASE_URL, VITE_PROXY_URL, VITE_APP_TITLE } = loadEnv(mode, process.cwd());
  // 开发模式自动设置代理
  const proxy = {};
  if (command === "serve") {
    proxy[VITE_BASE_URL] = {
      target: VITE_PROXY_URL,
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, ""),
    };
  }
  return {
    base: VITE_PUBLIC_PATH,
    root: process.cwd(),
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        // 配置全局scss文件
        scss: {
          additionalData: '@use "@/assets/style/variables.scss" as *;',
        },
      },
    },
    /*  https://cn.vitejs.dev/config/server-options.html#server-proxy */
    server: {
      hmr: true,
      host: "0.0.0.0",
      port: Number(VITE_PORT),
      open: false,
      proxy: proxy,
    },
    plugins: [
      vue(),
      /* setup script标签上定义组件name */
      vueSetupExtend(),
      /* 自动导入组件 */
      Components({
        resolvers: [ElementPlusResolver({ importStyle: "sass" })],
      }),
      /* https://github.com/vbenjs/vite-plugin-html/blob/main/README.zh_CN.md */
      createHtmlPlugin({
        // 是否压缩html
        minify: true,
        // 需要注入 index.html ejs 模版的数据
        inject: {
          data: {
            title: VITE_APP_TITLE,
          },
        },
      }),
      /* https://github.com/anncwb/vite-plugin-svg-icons */
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), "src/assets/svg")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
    ],
  };
};
