import type { RouteRecordRaw } from "vue-router";
import { Layout } from "@/router";

const staticRouter: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Layout,
    meta: {
      title: "Dashboard",
      icon: "dashboard",
    },
    redirect: "/dashboard/workbench",
    children: [
      {
        path: "/dashboard/workbench",
        name: "Workbench",
        component: () => import("@/views/dashboard/workbench/index.vue"),
        meta: {
          title: "工作台",
          affix: true,
        },
      },
    ],
  },
  {
    path: "/system",
    name: "System",
    component: Layout,
    meta: {
      title: "组织架构",
      icon: "tree",
    },
    redirect: "/system/user",
    children: [
      {
        path: "/system/user",
        name: "User",
        component: () => import("@/views/system/user/index.vue"),
        meta: {
          title: "用户管理",
        },
      },
      {
        path: "/system/role",
        name: "Role",
        component: () => import(`@/views/system/role/index.vue`),
        meta: {
          title: "角色管理",
        },
      },
    ],
  },
];
export default staticRouter;
