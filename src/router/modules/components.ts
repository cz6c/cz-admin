import type { RouteRecordRaw } from "vue-router";
import { Layout } from "@/router";

export default {
  path: "/components",
  name: "Components",
  component: Layout,
  meta: {
    title: "Components",
    icon: "dashboard",
  },
  redirect: "/components/table",
  children: [
    {
      path: "/components/table",
      name: "Table",
      component: () => import("@/views/components/Table/index.vue"),
      meta: {
        title: "高级列表",
      },
    },
    // {
    //   path: "/components/form",
    //   name: "From",
    //   component: () => import("@/views/components/form/page.vue"),
    //   meta: {
    //     title: "高级表单",
    //   },
    // },
  ],
} as RouteRecordRaw;
