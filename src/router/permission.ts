import type { Router } from "vue-router";
import { useAuthStore } from "@/store/modules/auth";
import { getToken } from "@/utils/auth";
import { PAGE_NOT_FOUND_ROUTE } from "./index";

const whitePathList: string[] = ["/login"];

export function createPermission(router: Router) {
  const authStore = useAuthStore();
  router.beforeEach(async (to, from, next) => {
    const token = getToken();
    // 白名单 或 路由 meta.ignoreAuth 设置为 true
    if (whitePathList.includes(to.path) || to.meta.ignoreAuth) {
      if (to.path === "/login" && token) {
        next((to.query?.redirect as string) || "/");
        return;
      }
      next();
      return;
    }
    // 登录超时
    const userId = authStore.id;
    if (token && userId) {
      next();
    } else {
      try {
        await authStore.getLoginUserInfo();
        next({ ...to, replace: true });
      } catch (error) {
        // 前端登出
        await authStore.logout();
        next({
          path: "/login",
          query: {
            redirect: `${to.fullPath}`,
          },
        });
      }
    }

    // Jump to the 404 page after processing the login
    if (from.path === "/login" && to.name === PAGE_NOT_FOUND_ROUTE.name && to.fullPath !== "/dashboard") {
      next("/dashboard");
      return;
    }
    // 动态添加路由
    // if (permissionStore.getIsDynamicAddedRoute) {
    //   next();
    //   return;
    // }
    // const routes = await permissionStore.buildRoutesAction();

    // routes.forEach(route => {
    //   router.addRoute(route as unknown as RouteRecordRaw);
    // });

    // router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);

    // permissionStore.setDynamicAddedRoute(true);

    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query });
    } else {
      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
      next(nextData);
    }
  });
}
