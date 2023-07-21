import type { RouteRecordRaw } from "vue-router";
import { Layout } from "/@/router";

export default {
  path: "/feat",
  name: "Feat",
  component: Layout,
  meta: {
    title: "功能",
    icon: "menu-feat",
  },
  redirect: "/components/tablePage",
  children: [],
} as RouteRecordRaw;
