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
  redirect: "/charts/bMap",
  children: [
    {
      path: "/charts/aMap",
      name: "AMap",
      component: () => import("/@/views/charts/aMap/index.vue"),
      meta: {
        title: "高德地图",
      },
    },
    {
      path: "/charts/map",
      name: "Map",
      component: () => import("/@/views/charts/map/index.vue"),
      meta: {
        title: "ECharts地图",
      },
    },
    {
      path: "/charts/bar",
      name: "Bar",
      component: () => import("/@/views/charts/bar/index.vue"),
      meta: {
        title: "柱状图",
      },
    },
  ],
} as AppRouteRecordRaw;
