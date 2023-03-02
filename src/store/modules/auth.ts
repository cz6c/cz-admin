import { defineStore } from "pinia";
import store from "@/store";
import { setToken, removeToken } from "@/utils/auth";
import { login, getLoginUserInfo } from "@/api/public/index";
import { LoginParams, UserInfo } from "@/api/public/index.d";

export const authStore = defineStore("auth", {
  state: () => ({ id: 0, username: "", avatar: "" }),
  getters: {},
  actions: {
    async login(loginParams: LoginParams): Promise<string | unknown> {
      try {
        const { data } = await login(loginParams);
        setToken(data.token);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getLoginUserInfo(): Promise<UserInfo | unknown> {
      try {
        const { data } = await getLoginUserInfo();
        if (!data) {
          return "登录过期，请重新登录";
        }
        const { userId, username, avatar } = data;
        this.id = userId;
        this.username = username;
        this.avatar = avatar;
        return data;
      } catch (error) {
        return error;
      }
    },
    async logout() {
      // this.SET_USERNAME("");
      // this.SET_NAME("");
      // this.SET_AVATAR("");
      // this.SET_ID("");
      // this.SET_PHONE("");
      removeToken();
      // resetRouter();
    },
  },
});

export function useAuthStore() {
  return authStore(store);
}
