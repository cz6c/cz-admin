import { PAGE_NOT_FOUND_ROUTE, RouterEnum } from "/@/router";
import { useAuthStore } from "/@/store/modules/auth";
import { getToken } from "/@/utils/auth";
import type { Router } from "vue-router";
import nProgress from "nprogress";
import { ElMessage, ElNotification } from "element-plus";
import { BASE_TITLE } from "/@/config";

/**
 * @description:  创建项目前置权限
 * @param {Router} router
 */
function createPermissionGuard(router: Router) {
  const whitePathList: string[] = [RouterEnum.BASE_LOGIN_PATH];

  router.beforeEach(async (to, from, next) => {
    const token = getToken();
    const authStore = useAuthStore();
    // 验证是否有token
    if (token) {
      if (to.path === RouterEnum.BASE_LOGIN_PATH) {
        next((to.query?.redirect as string) || "/");
      } else {
        // console.log(to, from);
        // 验证是否有用户信息
        if (authStore.id) {
          next();
        } else {
          try {
            await authStore.getLoginUserInfoAction();
            if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
              // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
              next({ path: to.fullPath, replace: true, query: to.query });
            } else {
              next({ ...to, replace: true });
            }
          } catch (error) {
            // 前端登出
            await authStore.webLogout();
            next({
              path: RouterEnum.BASE_LOGIN_PATH,
              query: {
                redirect: `${to.fullPath}`,
              },
            });
          }
        }
      }
    } else {
      // 白名单
      if (whitePathList.includes(to.path)) {
        next();
      } else {
        await authStore.webLogout();
        next({
          path: RouterEnum.BASE_LOGIN_PATH,
          query: {
            redirect: `${to.fullPath}`,
          },
        });
      }
    }
  });
}

/**
 * @description: 创建 NProgress
 * @param {Router} router
 */
function createProgressGuard(router: Router) {
  router.beforeEach(async to => {
    if (to.meta.loaded) {
      return true;
    }
    nProgress.start();
    return true;
  });

  router.afterEach(async () => {
    nProgress.done();
    return true;
  });
}

/**
 * @description: 路由切换时关闭消息实例
 * @param {Router} router
 */
function createMessageGuard(router: Router) {
  router.beforeEach(async () => {
    try {
      ElMessage.closeAll();
      ElNotification.closeAll();
    } catch (error) {
      console.log("message guard error:" + error);
    }
    return true;
  });
}

/**
 * @description: 动态title
 * @param {Router} router
 */
function createTitleGuard(router: Router) {
  router.beforeEach(async to => {
    document.title = to.meta.title ? `${to.meta.title} | ${BASE_TITLE}` : `${BASE_TITLE}`;
    return true;
  });
}

export function setupRouterGuard(router: Router) {
  createMessageGuard(router);
  createProgressGuard(router);
  createTitleGuard(router);
  createPermissionGuard(router);
}
