import { GetListParams, GetListResponse } from "@/api/public/index.d";
// 用户信息
export interface UserItem {
  id: number;
  account: string;
  email: string;
  nickname: string;
  role: string;
  createTime: number;
  remark: string;
  status: number;
}
export type ResponseUserList = GetListResponse<UserItem>;
export interface ParamsUserList extends GetListParams {
  account?: string;
  createTime?: number;
}
// 角色信息
export interface RoleItem {
  id: string;
  orderNo: number;
  roleName: string;
  roleValue: string;
  createTime: number;
  remark: string;
  menu: string[];
  status: number;
}
export type ResponseRoleList = GetListResponse<RoleItem>;
export interface ParamsRoleList extends GetListParams {
  createTime?: number;
}
// 部门信息
export interface DeptItem {
  id: number;
  deptName: string;
  orderNo: number;
  createTime: number;
  remark: string;
  status: number;
  parentDept?: number;
  children: DeptItem[];
}
export type ResponseDeptList = GetListResponse<DeptItem>;
export interface ParamsDeptList extends GetListParams {
  createTime?: number;
}
