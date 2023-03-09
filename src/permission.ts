import router, { PAGE_NOT_FOUND_ROUTE } from "./router";
import { useAuthStore } from "@/store/modules/auth";
import { getToken } from "@/utils/auth";

const whitePathList: string[] = ["/login"];
router.beforeEach(async (to, from, next) => {
  const token = getToken();
  const { id, getLoginUserInfo, webLogout } = useAuthStore();
  // 验证是否有token
  if (token) {
    if (to.path === "/login") {
      next((to.query?.redirect as string) || "/");
    } else {
      console.log(id, to, from);
      // 验证是否有用户信息
      if (id) {
        next();
      } else {
        try {
          await getLoginUserInfo();
          if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
            // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
            next({ path: to.fullPath, replace: true, query: to.query });
          } else {
            next({ ...to, replace: true });
          }
        } catch (error) {
          // 前端登出
          await webLogout();
          next({
            path: "/login",
            query: {
              redirect: `${to.fullPath}`,
            },
          });
        }
      }
    }
  } else {
    // 白名单 或 路由 meta.ignoreAuth 设置为 true
    if (whitePathList.includes(to.path) || to.meta.ignoreAuth) {
      next();
    } else {
      await webLogout();
      next({
        path: "/login",
        query: {
          redirect: `${to.fullPath}`,
        },
      });
    }
  }
});
