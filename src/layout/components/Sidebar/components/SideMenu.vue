<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      router
      unique-opened
      mode="vertical"
      :default-active="getActiveRoutePath"
      :collapse-transition="false"
      :class="{ on: layoutStore.getIsCollapse }"
      :collapse="layoutStore.getIsCollapse"
      @select="handleSelect"
    >
      <template v-for="item in authStore.getDynamicMenu" :key="item.path">
        <template v-if="isSubmenu(item)">
          <el-sub-menu :index="item.path">
            <template #title>
              <SvgIcon v-if="item.meta?.icon" :name="item.meta?.icon" size="18" />
              <span class="menu-text">{{ item.meta?.title }}</span>
            </template>
            <template v-for="childItem in item.children" :key="childItem.path">
              <template v-if="isSubmenu(childItem)">
                <el-sub-menu :index="childItem.path">
                  <template #title>
                    <span class="menu-text">{{ childItem.meta?.title }}</span>
                  </template>
                  <el-menu-item v-for="it in childItem.children" :key="it.path" :index="it.path">
                    <span class="menu-text">{{ it.meta?.title }}</span>
                  </el-menu-item>
                </el-sub-menu>
              </template>
              <template v-else>
                <el-menu-item :index="childItem.path">
                  <span class="menu-text">{{ childItem.meta?.title }}</span>
                </el-menu-item>
              </template>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path">
            <SvgIcon v-if="item.meta?.icon" :name="item.meta?.icon" size="18" />
            <span class="menu-text">{{ item.meta?.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts" name="SideMenu">
import { useRoute, RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/store/modules/auth";
import { computed } from "vue";
import { useLayoutStore } from "@/store/modules/layout";

const layoutStore = useLayoutStore();
const authStore = useAuthStore();
const route = useRoute();

const getActiveRoutePath = computed((): string => {
  let path = route.path;
  if (route.meta && route.meta.activeMenu) {
    path = route.meta.activeMenu as string;
  }
  return path;
});

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
}
</script>

<style lang="scss" scoped>
:deep(.scrollbar-wrapper) {
  .el-menu {
    border: none;
  }

  .el-menu-item {
    margin: 0 6px;
    border-radius: 8px;

    &.is-active {
      background: #ededfa;

      &::before {
        position: absolute;
        top: 50%;
        left: 0;
        border-radius: 0 2px 2px 0;
        width: 3px;
        height: 40%;
        transform: translateY(-50%);
        background: var(--el-color-primary);
        content: "";
      }
    }
  }

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
