import type { App } from "vue";

// elementui
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 表单组件
import FormView from "./Form/index.vue";
// 表格组件
import TableView from "./Table/index.vue";
// svg组件
import SvgIcon from "./SvgIcon.vue";

// 组件列表
const components = [FormView, TableView, SvgIcon];

function install(app: App<Element>) {
  // ElementUI组件
  app.use(ElementPlus, {
    locale: zhCn,
  });
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  // 组件循环注册
  components.forEach((component: any) => {
    // console.log(component);
    app.component(component.name, component);
  });
}

export default { install };
