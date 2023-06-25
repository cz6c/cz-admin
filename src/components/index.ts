import type { App } from "vue";
// elementui
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

function install(app: App<Element>) {
  // ElementUI组件
  app.use(ElementPlus, {
    locale: zhCn,
  });
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
}

export function registerGlobComp(app: App) {
  app.use({ install });
}
