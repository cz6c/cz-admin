import { createGet, createPost } from "@/utils/request";
import { ParamsDeptList, ResponseDeptList, DeptItem, DeptInfo } from "./index.d";

// 获取列表
export const getDeptList = createGet<ParamsDeptList, ResponseDeptList>("/admin/dept/list");
// 获取信息
export const getLoginDeptInfo = createGet<never, DeptItem>("/admin/dept/info");
// 新增
export const saveDept = createPost<DeptInfo, never>("/admin/dept/save");
// 编辑
export const updateDept = createPost<DeptInfo, never>("/admin/dept/update");
// 状态切换
export const statusChange = createPost<{ id: number; status: number }, never>("/admin/dept/status");
// 删除
export const delDept = createPost<{ id: number }, never>("/admin/dept/del");
