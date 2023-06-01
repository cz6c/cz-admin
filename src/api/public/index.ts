import { createGet, createPost } from "@/utils/request";
import { LoginParams, RouteRow, GetListResponse } from "./index.d";

// 登录
export const login = createPost<LoginParams, string>("/admin/login");
// 获取当前用户菜单
export const getMenuList = createGet<never, GetListResponse<RouteRow>>("/admin/getMenuList");
// 获取按钮权限
export const getPermCodeList = createGet<never, string[]>("/admin/getPermCodeList");
// 获取城市地区
export const getAreaList = createGet<never, any>("/admin/getAreaList");

// 上传图片
export const uploadImg = createPost<FormData, string>("/admin/upload");

export const uploadVideo = createPost<FormData, string>("/admin/upload");
// 获取七牛云上传token
export const getQiniuToken = createGet<never, { token: string; key: string; domain: string }>("/admin/getQiniuToken");
