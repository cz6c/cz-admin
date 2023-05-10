import { GetListParams, GetListResponse } from "@/api/public/index.d";

// 详情
export interface DeptItem {
  id: number;
  pid: number;
  deptName: string;
  remark: string;
  status: 0 | 1;
  isDel: 0 | 1;
  children: DeptItem[];
}
// 新增/编辑body
export interface DeptInfo extends Omit<DeptItem, "id" | "status" | "isDel"> {
  id?: string;
  status?: string;
  isDel?: string;
}
// 列表
export type ResponseDeptList = GetListResponse<DeptItem>;
export interface ParamsDeptList extends GetListParams {
  deptName?: number;
}
