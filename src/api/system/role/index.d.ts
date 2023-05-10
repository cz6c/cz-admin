import { GetListParams, GetListResponse } from "@/api/public/index.d";

// 详情
export interface RoleItem {
  id: string;
  roleName: string;
  remark: string;
  menuIds: number[];
  status: 0 | 1;
  isDel: 0 | 1;
}
// 新增/编辑body
export interface RoleInfo extends Omit<RoleItem, "id" | "status" | "isDel"> {
  id?: string;
  status?: string;
  isDel?: string;
}
// 列表
export type ResponseRoleList = GetListResponse<RoleItem>;
export interface ParamsRoleList extends GetListParams {
  roleName?: number;
}
