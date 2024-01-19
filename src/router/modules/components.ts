import type { AppRouteRecordRaw } from "@/router/type";
import { Layout } from "@/router";

export default {
  path: "/components",
  name: "Components",
  component: Layout,
  meta: {
    title: "组件",
    icon: "menu-components",
    orderNo: 3,
  },
  redirect: "/components/tablePage",
  children: [
    {
      path: "/components/tablePage",
      name: "Table",
      component: () => import("@/views/components/tablePage/index.vue"),
      meta: {
        title: "高级列表",
      },
    },
    {
      path: "/components/formPage",
      name: "From",
      component: () => import("@/views/components/formPage/page.vue"),
      meta: {
        title: "高级表单",
      },
    },
    {
      path: "/components/wangEditor",
      name: "WangEditorPage",
      component: () => import("@/views/components/wangEditor/index.vue"),
      meta: {
        title: "富文本编辑器",
      },
    },
    {
      path: "/components/upload",
      name: "Upload",
      component: () => import("@/views/components/upload/index.vue"),
      meta: {
        title: "图片上传",
      },
    },
  ],
} as AppRouteRecordRaw;
