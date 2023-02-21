import type { App } from "vue";

// elementui
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

// 表单组件
import FormView from "./FormView.vue";
// 表格组件
import TableView from "./TableView.vue";

// 组件列表
const components = [FormView, TableView];

function install(app: App<Element>) {
  // ElementUI组件
  app.use(ElementPlus, {
    locale: zhCn,
  });
  // 组件循环注册
  components.forEach((component: any) => {
    // console.log(component);
    app.component(component.__name, component);
  });
}

export default { install };
