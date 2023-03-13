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
  userId: number;
  username: string;
  realName: string;
  avatar: string;
  desc: string;
  roles: any[];
}

// 路由元信息
export interface RouteMeta {
  // 路由title  一般必填
  title: string;
  // 是否忽略KeepAlive缓存
  ignoreKeepAlive?: boolean;
  // 是否固定标签
  affix?: boolean;
  // 图标，也是菜单图标
  icon?: string;
  // 隐藏该路由在面包屑上面的显示
  hideBreadcrumb?: boolean;
  // 当前激活的菜单。用于配置详情页时左侧激活的菜单路径
  activeMenu?: string;
  // 当前路由不再标签页显示
  hideTag?: boolean;
  // 当前路由不再菜单显示
  hideMenu?: boolean;
}

// 路由元信息
export interface RouteRow {
  path: string;
  name: string;
  meta: RouteMeta;
  component?: string;
  redirect?: string;
  children?: RouteRow[];
}
