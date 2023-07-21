import type { RouteRecordRaw } from "vue-router";
import { Layout } from "/@/router";

export default {
  path: "/charts",
  name: "Charts",
  component: Layout,
  meta: {
    title: "图表",
    icon: "menu-charts",
  },
  redirect: "/components/tablePage",
  children: [],
} as RouteRecordRaw;
