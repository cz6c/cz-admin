import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Layout from "@/Layout/index.vue";
import staticRouter from "./modules/staticRoutes";

export enum PageEnum {
  // basic home path
  BASE_HOME = "/dashboard",
}

// 公共菜单
const routesList: RouteRecordRaw[] = [
  // 根路由
  {
    path: "/",
    name: "Root",
    redirect: PageEnum.BASE_HOME,
    meta: {
      title: "root",
    },
  },
  // 登录路由
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/public/login.vue"),
    meta: {
      title: "login",
    },
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/public/auth-redirect.vue"),
  },
  {
    path: "/auth-redirect-Layout",
    component: Layout,
    children: [
      {
        path: "/auth-redirect-Layout",
        name: "重定向",
        component: () => import("@/views/public/auth-redirect.vue"),
      },
    ],
  },
];

// 404
export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: "/:path(.*)*",
  name: "PAGE_NOT_FOUND_NAME",
  component: Layout,
  meta: {
    title: "ErrorPage",
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: "/:path(.*)*",
      name: "PAGE_NOT_FOUND_NAME",
      component: () => import("@/views/public/404.vue"),
      meta: {
        title: "ErrorPage",
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
};
// redirect
export const REDIRECT_ROUTE: RouteRecordRaw = {
  path: "/redirect",
  component: Layout,
  name: "RedirectTo",
  meta: {
    title: "REDIRECT_NAME",
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: "/redirect/:path(.*)",
      name: "REDIRECT_NAME",
      component: () => import("@/views/public/auth-redirect.vue"),
      meta: {
        title: "REDIRECT_NAME",
        hideBreadcrumb: true,
      },
    },
  ],
};

const routes = [...routesList, ...staticRouter, PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE];

// app router
export const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ left: 0, right: 0 }),
  routes,
});

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// function resetRouter(routes: RouteRecordRaw[]) {
//   const newRouter: any = createRoute(routes);
//   router.resolve = newRouter.resolve;
// }
// function flushRouter(menu: RouteRecordRaw[]) {
//   // 判断是否使用动态路由
//   if (true) {
//     menu.forEach((item: any) => {
//       item.component = Layout;
//       if (item.redirect && item.children.length) {
//         item.redirect = item.children[0].path;
//       }
//       setRoutesData(item);
//     });
//     const arr = [
//       {
//         path: "/",
//         redirect: menu[0].path || "/home",
//       },
//       ...routesList,
//       ...menu,
//     ];
//     resetRouter(arr);
//   } else {
//     const arr = [
//       {
//         path: "/",
//         redirect: "/home",
//       },
//       ...routesList,
//       ...staticRouter,
//     ];
//     resetRouter(arr);
//   }
// }
// 递归处理component
// function setRoutesData(row: any) {
//   if (row.children && row.children.length) {
//     row.children.forEach((item: any) => {
//       if (item.redirect && item.children.length) {
//         item.redirect = item.children[0].path;
//       }
//       const newName = item.component.replace(/@[\/]?views\//, "");
//       item.component = item.component && item.component != "Layout" ? () => import(`@/views/${newName}`) : Layout;
//       setRoutesData(item);
//     });
//   }
// }
// 解决相同路由报错
// const originalPush = router.prototype.push;
// (Router as any).prototype.push = function (location: RouteLocationRaw) {
//   return (originalPush as any).call(this, location).catch((err: Error) => err);
// };
// export { resetRouter, flushRouter };
export default router;
