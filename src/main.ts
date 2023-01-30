import { createApp } from "vue";
import App from "./App.vue";
// elementui
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// pinia
import { createPinia } from "pinia";
const pinia = createPinia();
// global css
import "@/assets/style/global.scss";

const app = createApp(App);
app.use(pinia);
app.use(ElementPlus);
app.mount("#app");
