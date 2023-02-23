import { createApp } from "vue";
import App from "./App.vue";

// pinia
import pinia from "@store/index";
// css
import "normalize.css";
import "@assets/style/global.scss";
// router
import router from "@/router";
// public components
import publicComs from "./components/index";
// 注册svg
import "virtual:svg-icons-register";

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(publicComs);
app.mount("#app");
