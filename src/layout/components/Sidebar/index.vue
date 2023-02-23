<script setup lang="ts">
import Logo from "./Logo.vue";
import { useRoute } from "vue-router";
// import SidebarItem from "./sidebarItem.vue";
import { ref, computed, watch, defineProps } from "vue";
import { findRouteByPath, getParentPaths } from "@/utils/router";
import { usePermissionStoreHook } from "@/store/modules/permission";

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();

const subMenuData = ref([]);

const menuData = computed(() => {
  return [];
});

function getSubMenuData(path: string) {
  // path的上级路由组成的数组
  const parentPathArr = getParentPaths(path, usePermissionStoreHook().wholeMenus);
  // 当前路由的父级路由信息
  const parenetRoute = findRouteByPath(parentPathArr[0] || path, usePermissionStoreHook().wholeMenus);
  if (!parenetRoute?.children) return;
  subMenuData.value = parenetRoute?.children;
}

getSubMenuData(route.path);

watch(
  () => [route.path, usePermissionStoreHook().wholeMenus],
  () => {
    getSubMenuData(route.path);
  },
);
</script>

<template>
  <div :class="['sidebar-container', 'has-logo']">
    <Logo :isCollapse="props.isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- <el-menu
        router
        unique-opened
        mode="vertical"
        class="outer-most select-none"
        :collapse="isCollapse"
        :default-active="route.path"
        :collapse-transition="false"
        @select="indexPath => menuSelect(indexPath, routers)"
      >
        <sidebar-item
          v-for="routes in menuData"
          :key="routes.path"
          :item="routes"
          :base-path="routes.path"
          class="outer-most select-none"
        />
      </el-menu> -->
    </el-scrollbar>
  </div>
</template>

<style scoped>
:deep(.el-loading-mask) {
  opacity: 0.45;
}
</style>
