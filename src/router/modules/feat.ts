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
  redirect: "/feat/drag",
  children: [
    {
      path: "/feat/drag",
      name: "Drag",
      component: () => import("/@/views/feat/drag/index.vue"),
      meta: {
        title: "拖拽",
      },
    },
    {
      path: "/feat/gsap",
      name: "Gsap",
      component: () => import("/@/views/feat/gsap/index.vue"),
      meta: {
        title: "gsap",
      },
    },
  ],
} as AppRouteRecordRaw;
