import type { RouteRecordRaw } from "vue-router";
const Layout = () => import("@/layout/index.vue");

const staticRouter: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    component: Layout,
    meta: {
      name: "Dashboard",
      icon: "dashboard",
    },
    redirect: "/dashboard/loginLog",
    children: [
      {
        path: "/dashboard/loginLog",
        name: "LoginLog",
        meta: {
          name: "登录日志",
        },
        component: () => import("@views/dashboard/loginLog/index.vue"),
      },
    ],
  },
  {
    path: "/system",
    component: Layout,
    meta: {
      name: "组织架构",
      icon: "tree",
    },
    redirect: "/system/user/index",
    children: [
      {
        path: "/system/user/index",
        name: "User",
        meta: {
          name: "用户管理",
        },
        component: () => import("@views/system/user/index.vue"),
      },
      {
        path: "/system/role/index",
        name: "Role",
        meta: {
          name: "角色管理",
        },
        component: () => import("@views/system/role/index.vue"),
      },
      {
        path: "/system/dept/index",
        name: "Dept",
        meta: {
          name: "部门管理",
        },
        component: () => import("@views/system/dept/index.vue"),
      },
    ],
  },
];
export default staticRouter;
