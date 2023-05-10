import { createGet, createPost } from "@/utils/request";
import { LoginParams, RouteRow, GetListResponse } from "./index.d";
import { BASE_URL } from "@/config";

// 登录
export const login = createPost<LoginParams, string>("/admin/login");
// 获取当前用户菜单
export const getMenuList = createGet<never, GetListResponse<RouteRow>>("/admin/getMenuList");
// 获取按钮权限
export const getPermCodeList = createGet<never, string[]>("/admin/getPermCodeList");
// 获取城市地区
export const getAreaList = createGet<never, any>("/admin/getAreaList");

// 统一后台七牛云存储接口（单文件/多文件）
export const common = {
  imgApi: `${BASE_URL}/admin/upload`,
};
// 上传图片
export const qiNiuUpload = createPost<never, never>("/admin/upload");
