import type { RouteRecordRaw } from "vue-router";
import { Layout } from "/@/router";

export default {
  path: "/components",
  name: "Components",
  component: Layout,
  meta: {
    title: "Components",
    icon: "dashboard",
  },
  redirect: "/components/table",
  children: [
    {
      path: "/components/table",
      name: "Table",
      component: () => import("/@/views/components/Table/index.vue"),
      meta: {
        title: "高级列表",
      },
    },
    {
      path: "/components/form",
      name: "From",
      component: () => import("/@/views/components/Form/page.vue"),
      meta: {
        title: "高级表单",
      },
    },
    {
      path: "/components/wangEditor",
      name: "WangEditorPage",
      component: () => import("/@/views/components/wangEditor/index.vue"),
      meta: {
        title: "富文本编辑器",
      },
    },
    {
      path: "/components/upload",
      name: "Upload",
      component: () => import("/@/views/components/upload/index.vue"),
      meta: {
        title: "图片上传",
      },
    },
  ],
} as RouteRecordRaw;
