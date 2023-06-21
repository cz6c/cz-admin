import { ProxyOptions } from "vite";
type ProxyTargetList = Record<string, ProxyOptions>;

export const proxy: ProxyTargetList = {
  "/api": {
    target: "https://api.cz6hy9.top",
    changeOrigin: true,
    rewrite: path => path.replace(/^\/api/, ""),
  },
};
