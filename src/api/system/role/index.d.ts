import { GetListParams, GetListResponse } from "/@/api/public/index.d";

// 详情
export interface RoleItem {
  id: number;
  roleName: string;
  remark: string;
  menuIds: string | number[];
  status: 0 | 1;
  isDel: 0 | 1;
}
// 新增/编辑body
export interface RoleInfo extends Omit<RoleItem, "id" | "status" | "isDel"> {
  id?: number;
  status?: 0 | 1;
  isDel?: 0 | 1;
}
// 列表
export type ResponseRoleList = GetListResponse<RoleItem>;
export interface ParamsRoleList extends GetListParams {
  roleName?: number;
}
