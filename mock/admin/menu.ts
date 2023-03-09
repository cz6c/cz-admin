import { resultSuccess, resultError, getRequestToken, requestParams } from "../_util";
import { MockMethod } from "vite-plugin-mock";

const dashboardRoute = {
  path: "/dashboard",
  name: "Dashboard",
  component: "Layout",
  meta: {
    title: "Dashboard",
    icon: "dashboard",
  },
  redirect: "/dashboard/loginLog/index",
  children: [
    {
      path: "/dashboard/loginLog/index",
      name: "LoginLog",
      meta: {
        title: "登录日志",
        roles: ["admin"],
      },
    },
  ],
};

const systemRouter = {
  path: "/system",
  name: "System",
  component: "Layout",
  meta: {
    title: "组织架构",
    icon: "tree",
  },
  redirect: "/system/user/index",
  children: [
    {
      path: "/system/user/index",
      name: "User",
      meta: {
        title: "用户管理",
        roles: ["admin"],
      },
    },
    {
      path: "/system/role/index",
      name: "Role",
      meta: {
        title: "角色管理",
        roles: ["admin"],
      },
    },
    {
      path: "/system/dept/index",
      name: "Dept",
      meta: {
        title: "部门管理",
        roles: ["admin"],
      },
    },
  ],
};

export default [
  {
    url: "/adminapi/getMenuList",
    method: "get",
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return resultError({ message: "Invalid token!", code: 401 });
      }
      const menu = [dashboardRoute, systemRouter];
      return resultSuccess(menu);
    },
  },
] as MockMethod[];
