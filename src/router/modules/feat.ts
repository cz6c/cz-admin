import type { AppRouteRecordRaw } from "/@/router/type";
import { Layout } from "/@/router";

export default {
  path: "/feat",
  name: "Feat",
  component: Layout,
  meta: {
    title: "功能",
    icon: "menu-feat",
    orderNo: 4,
  },
  redirect: "/components/tablePage",
  children: [],
} as AppRouteRecordRaw;
