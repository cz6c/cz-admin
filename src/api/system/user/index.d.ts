import { GetListParams, GetListResponse } from "@/api/public/index.d";
// 详情
export interface UserItem {
  id: number;
  roleId: number | string;
  username: string;
  avatar: string;
  status: 0 | 1;
  isDel: 0 | 1;
}
// 新增/编辑body
export interface UserInfo extends Omit<UserItem, "id" | "status" | "isDel"> {
  id?: number;
  status?: 0 | 1;
  isDel?: 0 | 1;
}
// 列表
export type UserListResponse = GetListResponse<UserItem>;
export interface UserListParams extends GetListParams {
  username?: string;
}
