<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      router
      unique-opened
      mode="vertical"
      :default-active="route.path"
      :collapse-transition="false"
      :class="{ on: props.isCollapse }"
      :collapse="props.isCollapse"
      @select="handleSelect"
    >
      <template v-for="item in menuData" :key="item.path">
        <template v-if="isSubmenu(item)">
          <el-sub-menu :index="item.path">
            <template #title>
              <SvgIcon :name="item.meta?.icon" size="18" />
              <span class="menu-text">{{ item.meta?.name }}</span>
            </template>
            <template v-for="childItem in item.children" :key="childItem.path">
              <template v-if="isSubmenu(childItem)">
                <el-sub-menu :index="childItem.path">
                  <template #title>
                    <span class="menu-text">{{ childItem.meta?.name }}</span>
                  </template>
                  <el-menu-item v-for="it in childItem.children" :key="it.path" :index="it.path">
                    <span class="menu-text">{{ it.meta?.name }}</span>
                  </el-menu-item>
                </el-sub-menu>
              </template>
              <template v-else>
                <el-menu-item :index="childItem.path">
                  <span class="menu-text">{{ childItem.meta?.name }}</span>
                </el-menu-item>
              </template>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path">
            <SvgIcon :name="item.meta?.icon" size="18" />
            <span class="menu-text">{{ item.meta?.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRoute } from "vue-router";
import { getParentPaths } from "@/utils/router";
import type { RouteRecordRaw } from "vue-router";
import staticRouter from "@/router/modules/staticRoutes";

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();

const menuData = staticRouter;

/**
 * @description: 判断路由是否有可显示的子集菜单
 * @param {*} item 路由
 * @return {*} boolean
 */
function isSubmenu(item: RouteRecordRaw): boolean {
  const childItem = item.children || [];
  const showItemList = childItem.filter(({ meta }) => !meta?.hidden);
  return showItemList.length > 0;
}
/**
 * @description: 点击菜单栏
 * @param {*} path 当前路由路径
 */
function handleSelect(path: string) {
  console.log(path);
  const paths = getParentPaths(path, menuData);
  console.log(paths);
}
</script>

<style lang="scss" scoped>
:deep(.scrollbar-wrapper) {
  .on {
    .el-sub-menu__title {
      padding-right: 0;
    }
  }
  .menu-text {
    margin-left: 8px;
  }
}
</style>
