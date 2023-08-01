import { createGet, createPost } from "/@/utils/request";
import { UserListParams, UserListResponse, UserItem, UserInfo } from "./index.d";

// 获取列表
export const getUserListApi = createGet<UserListParams, UserListResponse>("/admin/user/list");

// 获取信息
export const getLoginUserInfoApi = createGet<never, UserItem>("/admin/user/info");
// 新增
export const saveUserApi = createPost<UserInfo, never>("/admin/user/save");
// 编辑
export const updateUserApi = createPost<UserInfo, never>("/admin/user/update");
// 状态切换
export const statusChangeApi = createPost<{ id: number; status: string | number | boolean }, never>(
  "/admin/user/status",
);
// 删除
export const delUserApi = createPost<{ id: number }, never>("/admin/user/del");
