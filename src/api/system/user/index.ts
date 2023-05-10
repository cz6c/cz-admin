import { createGet, createPost } from "@/utils/request";
import { ParamsUserList, ResponseUserList, UserItem, UserInfo } from "./index.d";

// 获取列表
export const getUserList = createGet<ParamsUserList, ResponseUserList>("/admin/user/list");
// 获取信息
export const getLoginUserInfo = createGet<never, UserItem>("/admin/user/info");
// 新增
export const saveUser = createPost<UserInfo, never>("/admin/user/save");
// 编辑
export const updateUser = createPost<UserInfo, never>("/admin/user/update");
// 状态切换
export const statusChange = createPost<{ id: number; status: number }, never>("/admin/user/status");
// 删除
export const delUser = createPost<{ id: number }, never>("/admin/user/del");
