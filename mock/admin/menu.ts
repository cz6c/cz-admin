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
  redirect: "/dashboard/workbench",
  children: [
    {
      path: "/dashboard/workbench",
      name: "Workbench",
      component: "@/views/dashboard/workbench/index",
      meta: {
        title: "工作台",
        affix: true,
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
  redirect: "/system/user",
  children: [
    {
      path: "/system/user",
      name: "User",
      component: "@/views/system/user/index",
      meta: {
        title: "用户管理",
      },
      children: [
        {
          path: "/system/user/addUser",
          name: "AddUser",
          component: "@/views/system/user/addUser",
          meta: {
            title: "新增用户",
            hideMenu: true,
            activeMenu: "/system/user",
          },
        },
      ],
    },
    {
      path: "/system/role",
      name: "Role",
      component: `@/views/system/role/index`,
      meta: {
        title: "角色管理",
      },
    },
    {
      path: "/system/dept",
      name: "Dept",
      component: "@/views/system/dept/index",
      meta: {
        title: "部门管理",
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
  {
    url: "/adminapi/getPermCodeList",
    method: "get",
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return resultError({ message: "Invalid token!", code: 401 });
      }
      const permCode = [1, 2, 3, 4, 5, 6];
      return resultSuccess(permCode);
    },
  },
] as MockMethod[];
