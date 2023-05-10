import { createGet, createPost } from "@/utils/request";
import { ParamsRoleList, ResponseRoleList, RoleItem, RoleInfo } from "./index.d";

// 获取列表
export const getRoleList = createGet<ParamsRoleList, ResponseRoleList>("/admin/role/list");
// 获取信息
export const getLoginRoleInfo = createGet<never, RoleItem>("/admin/role/info");
// 新增
export const saveRole = createPost<RoleInfo, never>("/admin/role/save");
// 编辑
export const updateRole = createPost<RoleInfo, never>("/admin/role/update");
// 状态切换
export const statusChange = createPost<{ id: number; status: number }, never>("/admin/role/status");
// 删除
export const delRole = createPost<{ id: number }, never>("/admin/role/del");
