import { createApp } from "vue";
import App from "./App.vue";

// pinia
import store from "@/store";
// css
import "normalize.css";
import "@/assets/style/global.scss";
// router
import router from "@/router";
// public components
import publicComs from "./components/index";
// 注册svg
import "virtual:svg-icons-register";
// 路由权限
import "./permission";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(publicComs);
app.mount("#app");
