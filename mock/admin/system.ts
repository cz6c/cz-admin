import { MockMethod } from "vite-plugin-mock";
import { resultPageSuccess, resultSuccess } from "../_util";

const userList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      id: `${index}`,
      account: "@first",
      email: "@email",
      nickname: "@cname()",
      role: "@first",
      createTime: "@datetime",
      remark: "@cword(10,20)",
      // "status|1": ["0", "1"],
    });
  }
  return result;
})();

const roleList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 4; index++) {
    result.push({
      id: index + 1,
      orderNo: `${index + 1}`,
      roleName: ["超级管理员", "管理员", "文章管理员", "普通用户"][index],
      roleValue: "@first",
      createTime: "@datetime",
      remark: "@cword(10,20)",
      menu: [["0", "1", "2"], ["0", "1"], ["0", "2"], ["2"]][index],
      "status|1": ["0", "1"],
    });
  }
  return result;
})();

const deptList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 3; index++) {
    result.push({
      id: `${index}`,
      deptName: ["华东分部", "华南分部", "西北分部"][index],
      orderNo: index + 1,
      createTime: "@datetime",
      remark: "@cword(10,20)",
      "status|1": ["0", "0", "1"],
      children: (() => {
        const children: any[] = [];
        for (let j = 0; j < 4; j++) {
          children.push({
            id: `${index}-${j}`,
            deptName: ["研发部", "市场部", "商务部", "财务部"][j],
            orderNo: j + 1,
            createTime: "@datetime",
            remark: "@cword(10,20)",
            "status|1": ["0", "1"],
            parentDept: `${index}`,
            children: undefined,
          });
        }
        return children;
      })(),
    });
  }
  return result;
})();

export default [
  {
    url: "/adminapi/system/getUserList",
    method: "get",
    response: ({ query }) => {
      console.log(query);
      const { page, limit } = query;
      if (page && limit) {
        return resultPageSuccess(page, limit, userList);
      }
      return resultSuccess(userList);
    },
  },
  {
    url: "/adminapi/system/getRoleList",

    method: "get",
    response: ({ query }) => {
      const { page, limit } = query;
      if (page && limit) {
        return resultPageSuccess(page, limit, roleList);
      }
      return resultSuccess(roleList);
    },
  },
  {
    url: "/adminapi/system/setRoleStatus",

    method: "post",
    response: ({ query }) => {
      const { id, status } = query;
      return resultSuccess({ id, status });
    },
  },
  {
    url: "/adminapi/system/getDeptList",

    method: "get",
    response: ({ query }) => {
      const { page, limit } = query;
      if (page && limit) {
        return resultPageSuccess(page, limit, deptList);
      }
      return resultSuccess(deptList);
    },
  },
] as MockMethod[];
