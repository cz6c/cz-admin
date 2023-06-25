import { UserConfigExport, ConfigEnv, loadEnv } from "vite";
import { resolve } from "path";
import { createVitePlugins } from "./build/vite/plugins";
import { wrapperEnv } from "./build/utils";
import { createProxy } from "./build/vite/proxy";

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), ".", dir);
};

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const isProduction = command === "build";
  console.log(isProduction);
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  console.log(env);
  return {
    root,
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: pathResolve("src") + "/",
        },
        // /#/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: pathResolve("types") + "/",
        },
      ],
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
      host: true,
      hmr: true,
      port: viteEnv.VITE_PORT,
      proxy: createProxy(viteEnv.VITE_PROXY),
    },
    plugins: createVitePlugins(viteEnv, isProduction),
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  };
};
