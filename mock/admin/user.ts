import { MockMethod } from "vite-plugin-mock";
import { resultError, resultSuccess, getRequestToken, requestParams } from "../_util";

export function createFakeUserList() {
  return [
    {
      userId: "1",
      username: "vben",
      realName: "Vben Admin",
      avatar: "",
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
      userId: "2",
      username: "test",
      password: "123456",
      realName: "test user",
      avatar: "",
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
    url: "/adminapi/login",
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
    url: "/adminapi/getUserInfo",
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
    url: "/adminapi/logout",
    method: "get",
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError({ message: "Invalid token", code: 401 });
      return resultSuccess(null, { message: "Token has been destroyed" });
    },
  },
] as MockMethod[];
