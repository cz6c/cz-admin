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
  userName: string;
  password: string;
  code: string;
}

// 用户信息
export interface UserInfo {
  id: string;
  token: string;
  userName: string;
  avatar: string;
  phone: string;
  name: string;
}

// 菜单数据
export interface MenuData {
  menu: [];
}
