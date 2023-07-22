interface ProductConfig {
  isDynamicAddedRoute: boolean;
  isPermCode: boolean;
}

export const productConfig: ProductConfig = {
  // 是否启用动态路由
  isDynamicAddedRoute: false,
  // 是否启用按钮权限控制
  isPermCode: false,
};
