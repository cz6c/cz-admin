import { createGet, createPost } from "@/utils/request";
import { LoginParams, UserInfo, MenuData } from "./index.d";

// 登录
export const login = createPost<LoginParams, UserInfo>("/adminapi/login");
// 获取用户信息
export const getLoginUserInfo = createGet<never, UserInfo>("/adminapi/getUserInfo");
// 获取当前用户菜单
export const getLoginUserMenu = createGet<never, MenuData>("/adminapi/getLoginUserMenu");
// 获取城市地区
export const getAreaList = createGet<never, never>("/adminapi/getAreaList");

// 统一后台七牛云存储接口（单文件/多文件）
export const common = {
  imgApi: `${import.meta.env.VITE_BASE_URL}/adminapi/qiNiuUpload`,
};
// 上传图片
export const qiNiuUpload = createPost<never, never>("/adminapi/qiNiuUpload");
