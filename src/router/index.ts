import { createRouter, createWebHashHistory, Router } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
import staticRouter from "./modules/staticRoutes";

// 公共菜单
const routesList: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("@views/public/login.vue"),
  },
  {
    path: "/auth-redirect",
    component: () => import("@views/public/auth-redirect.vue"),
  },
  {
    path: "/auth-redirect-layout",
    component: Layout,
    children: [
      {
        path: "/auth-redirect-layout",
        name: "重定向",
        component: () => import("@views/public/auth-redirect.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@views/public/404.vue"),
  },
];

function createRoute(routes: RouteRecordRaw[]): Router {
  return createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ left: 0, right: 0 }),
    routes: routes,
  });
}

const router = createRoute([...routesList, ...staticRouter]);

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
//       item.component = item.component && item.component != "Layout" ? () => import(`@views/${newName}`) : Layout;
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
