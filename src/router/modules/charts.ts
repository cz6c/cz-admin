import type { AppRouteRecordRaw } from "/@/router/type";
import { Layout } from "/@/router";

export default {
  path: "/charts",
  name: "Charts",
  component: Layout,
  meta: {
    title: "图表",
    icon: "menu-charts",
    orderNo: 5,
  },
  redirect: "/components/tablePage",
  children: [],
} as AppRouteRecordRaw;
