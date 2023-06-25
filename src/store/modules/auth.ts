import { defineStore } from "pinia";
import store from "/@/store";
import { setToken, removeToken } from "/@/utils/auth";
import { login, getMenuList, getPermCodeList } from "/@/api/public";
import { getLoginUserInfoApi } from "/@/api/system/user";
import { LoginParams } from "/@/api/public/index.d";
import { UserItem } from "/@/api/system/user/index.d";
import { isDynamicAddedRoute, isPermCode } from "/@/config";
import router, { resetRouter } from "/@/router";
import { getStaticRoutes } from "/@/router/static";
import { menuToRoute } from "/@/utils/router";
import type { RouteRecordRaw } from "vue-router";
import { useMultiTagsStore } from "./multiTags";
import { filterTree } from "/@/utils/tree";

interface authStoreState {
  id: number;
  username: string;
  avatar: string;
  dynamicRoutes: RouteRecordRaw[];
  permCodeList: string[];
}

export const authStore = defineStore("auth", {
  state: (): authStoreState => ({
    // 用户id
    id: 0,
    // 用户昵称
    username: "",
    // 用户头像
    avatar: "",
    // 动态路由
    dynamicRoutes: [],
    // 按钮级权限
    permCodeList: [],
  }),
  getters: {
    getDynamicMenu(): RouteRecordRaw[] {
      return filterTree(this.dynamicRoutes, route => {
        return !route.meta?.hideMenu;
      });
    },
    getPermCodeList(): string[] {
      return this.permCodeList;
    },
    getDynamicRoutes(): RouteRecordRaw[] {
      return this.dynamicRoutes;
    },
  },
  actions: {
    /**
     * @description: 登录
     * @param {LoginParams} loginParams
     * @return {*}
     */
    async login(loginParams: LoginParams): Promise<string | unknown> {
      try {
        const { data } = await login(loginParams);
        setToken(data);
        await this.getLoginUserInfoAction();
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * @description: 获取用户信息
     * @return {*}
     */
    async getLoginUserInfoAction(): Promise<UserItem | unknown> {
      try {
        const { data } = await getLoginUserInfoApi();
        const { id, username, avatar } = data;
        this.id = id;
        this.username = username;
        this.avatar = avatar;
        await this.getMenuListAction();
        if (isPermCode) {
          await this.getPermCodeListAction();
        }
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * @description: 获取菜单
     * @return {*}
     */
    async getMenuListAction(): Promise<RouteRecordRaw[] | unknown> {
      try {
        let routeList: RouteRecordRaw[] = [];
        if (isDynamicAddedRoute) {
          const { data } = await getMenuList();
          routeList = menuToRoute(data.list);
        } else {
          routeList = await getStaticRoutes();
        }
        // 重置路由
        resetRouter();
        routeList.forEach((route: any) => {
          router.addRoute(route as RouteRecordRaw);
        });
        this.dynamicRoutes = routeList;
        return routeList;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * @description: 获取按钮权限
     * @return {*}
     */
    async getPermCodeListAction(): Promise<string[] | unknown> {
      try {
        const { data } = await getPermCodeList();
        this.permCodeList = data;
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * @description: 前端登出
     */
    async webLogout() {
      this.$reset();
      removeToken();
      resetRouter();
      const { resetState } = useMultiTagsStore();
      resetState();
    },
  },
});

export function useAuthStore() {
  return authStore(store);
}
