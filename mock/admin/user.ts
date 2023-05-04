import { MockMethod } from "vite-plugin-mock";
import { resultError, resultSuccess, getRequestToken, requestParams } from "../_util";

export function createFakeUserList() {
  return [
    {
      userId: 1,
      username: "admin",
      realName: "czadmin",
      avatar: "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
      desc: "manager",
      password: "123456",
      token: "fakeToken1",
      roles: [
        {
          roleName: "Super Admin",
          value: "super",
        },
      ],
    },
    {
      userId: 2,
      username: "test",
      password: "123456",
      realName: "testuser",
      avatar: "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
      desc: "tester",
      token: "fakeToken2",
      roles: [
        {
          roleName: "Tester",
          value: "test",
        },
      ],
    },
  ];
}

export default [
  {
    url: "/admin/login",
    method: "post",
    response: ({ body }) => {
      const { username, password } = body;
      const checkUser = createFakeUserList().find(item => item.username === username && password === item.password);
      if (!checkUser) {
        return resultError({ message: "Incorrect account or password！" });
      }
      const { token } = checkUser;
      return resultSuccess({
        token,
      });
    },
  },
  {
    url: "/admin/getUserInfo",
    method: "get",
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError({ message: "Invalid token", code: 401 });
      const checkUser = createFakeUserList().find(item => item.token === token);
      if (!checkUser) {
        return resultError({ message: "The corresponding user information was not obtained!" });
      }
      return resultSuccess(checkUser);
    },
  },
  {
    url: "/admin/logout",
    method: "get",
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError({ message: "Invalid token", code: 401 });
      return resultSuccess(null, { message: "Token has been destroyed" });
    },
  },
] as MockMethod[];
