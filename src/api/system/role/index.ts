import { createGet, createPost } from "@/utils/request";
import { ParamsRoleList, ResponseRoleList, RoleItem, RoleInfo } from "./index.d";

// 获取列表
export const getRoleListApi = createGet<ParamsRoleList, ResponseRoleList>("/admin/role/list");
// 获取信息
export const getRoleInfoApi = createGet<{ id: number }, RoleItem>("/admin/role/info");
// 新增
export const saveRoleApi = createPost<RoleInfo, unknown>("/admin/role/save");
// 编辑
export const updateRoleApi = createPost<RoleInfo, unknown>("/admin/role/update");
// 状态切换
export const statusChangeApi = createPost<{ id: number; status: 0 | 1 }, unknown>("/admin/role/status");
// 删除
export const delRoleApi = createPost<{ id: number }, unknown>("/admin/role/del");
