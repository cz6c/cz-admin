import type { AppRouteRecordRaw } from "@/router/type";
import { Layout } from "@/router";

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
      component: () => import("@/views/charts/aMap/index.vue"),
      meta: {
        title: "高德地图",
      },
    },
    {
      path: "/charts/map",
      name: "Map",
      component: () => import("@/views/charts/map/index.vue"),
      meta: {
        title: "ECharts地图",
      },
    },
    {
      path: "/charts/other",
      name: "Other",
      component: () => import("@/views/charts/other/index.vue"),
      meta: {
        title: "ECharts其他图表",
      },
    },
    {
      path: "/charts/flowChart",
      name: "FlowChartPage",
      component: () => import("@/views/charts/flowChart/index.vue"),
      meta: {
        title: "流程图",
      },
    },
  ],
} as AppRouteRecordRaw;
