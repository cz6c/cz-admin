import type { AppRouteRecordRaw } from "/@/router/type";
import { Layout, IFrame } from "/@/router";

export default {
  path: "/iframe",
  name: "IFrame",
  component: Layout,
  redirect: "/iframe/doc",
  meta: {
    icon: "menu-iframe",
    title: "外部页面",
    orderNo: 6,
  },
  children: [
    {
      path: "/iframe/doc",
      name: "IFrameDoc",
      component: IFrame,
      meta: {
        frameSrc: "https://blog.cz6hy9.top/product/admin/",
        title: "内嵌文档",
      },
    },
    {
      path: "https://blog.cz6hy9.top/product/admin/",
      name: "DocExternal",
      component: IFrame,
      meta: {
        title: "外部文档",
      },
    },
  ],
} as AppRouteRecordRaw;
