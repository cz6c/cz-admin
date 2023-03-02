// 列表请求
export interface GetListParams {
  page?: number;
  limit?: number;
}
// 列表响应
export interface GetListResponse<T> {
  list: Array<T>;
  limit: number;
  page: number;
  total: number;
}

// 登录参数
export interface LoginParams {
  username: string;
  password: string;
}

// 用户信息
export interface UserInfo {
  userId: number,
  username: string,
  realName: string,
  avatar: string,
  desc: string,
  roles: any[],
}

// 菜单数据
export interface MenuData {
  menu: [];
}
