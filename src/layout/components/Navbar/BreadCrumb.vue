<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { getParentPaths, findRouteByPath } from "@/utils/router";
import { useRoute, useRouter, RouteLocationMatched } from "vue-router";

const route = useRoute();
const levelList = ref([]);
const router = useRouter();
const routes: any = router.options.routes;

const isDashboard = (route: RouteLocationMatched): boolean | string => {
  const name = route && (route.name as string);
  if (!name) return false;
  return name.trim().toLocaleLowerCase() === "Welcome".toLocaleLowerCase();
};

const getBreadcrumb = (): void => {
  // 当前路由信息
  let currentRoute: any;
  // 当前路由的父级路径组成的数组
  const parentRoutes = getParentPaths(router.currentRoute.value.path, routes);
  // 存放组成面包屑的数组
  let matched: any = [];
  // 获取每个父级路径对应的路由信息
  parentRoutes.forEach(path => {
    if (path !== "/") matched.push(findRouteByPath(path, routes));
  });

  if (currentRoute?.path !== "/welcome") matched.push(currentRoute);

  if (!isDashboard(matched[0])) {
    matched = [
      {
        path: "/welcome",
        parentPath: "/",
        meta: { title: "首页" },
      } as unknown as RouteLocationMatched,
    ].concat(matched);
  }

  matched.forEach((item, index) => {
    if (currentRoute?.query || currentRoute?.params) return;
    if (item?.children) {
      item.children.forEach(v => {
        if (v?.meta?.title === item?.meta?.title) {
          matched.splice(index, 1);
        }
      });
    }
  });

  levelList.value = matched.filter(item => item?.meta && item?.meta.title !== false);
};

const handleLink = (item: RouteLocationMatched): void => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect as any);
  } else {
    router.push(path);
  }
};

onMounted(() => {
  getBreadcrumb();
});

watch(
  () => route.path,
  () => {
    getBreadcrumb();
  },
);
</script>

<template>
  <el-breadcrumb class="!leading-[50px] select-none" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in levelList" :key="item.path" class="!inline !items-stretch">
        <a @click.prevent="handleLink(item)">
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
