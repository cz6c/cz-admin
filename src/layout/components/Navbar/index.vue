<template>
  <div class="navbar">
    <div class="navbar-left">
      <div
        class="collapse navbar-hover"
        :class="{ active: layoutStore.getIsCollapse }"
        :title="layoutStore.getIsCollapse ? '点击展开' : '点击折叠'"
        @click="toggleClick"
      >
        <SvgIcon name="collapse" />
      </div>
      <Breadcrumb class="breadcrumb-container" />
    </div>
    <div class="navbar-right">
      <!-- 退出登录 -->
      <el-dropdown trigger="click">
        <span class="user-info navbar-hover">
          <el-avatar :size="36" fit="cover" :src="useAuthStore().avatar" />
          <p v-if="useAuthStore().username" class="name">{{ useAuthStore().username }}</p>
        </span>
        <template #dropdown>
          <el-dropdown-menu class="logout">
            <el-dropdown-item @click="logout"> 退出系统 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts" name="Navbar">
import Breadcrumb from "./components/BreadCrumb.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/modules/auth";
import { useLayoutStore } from "@/store/modules/layout";

const { webLogout } = useAuthStore();
const layoutStore = useLayoutStore();

const router = useRouter();

function toggleClick() {
  layoutStore.setIsCollapse(!layoutStore.getIsCollapse);
}

/**
 * @description: 登出
 */
async function logout() {
  await webLogout();
  router.push("/login");
}
</script>

<style scoped lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d9d9d9;
  height: 50px;

  &-left,
  &-right {
    display: flex;
    align-items: center;
    height: 100%;
  }

  &-hover {
    display: flex;
    align-items: center;
    height: 100%;

    &:hover {
      cursor: pointer;
      background-color: #f6f6f6;
    }
  }

  &-left {
    .collapse {
      padding: 0 10px;

      &.active {
        transform: rotate(180deg);
      }
    }
  }

  :deep(.el-dropdown) {
    height: 100%;

    .user-info {
      padding: 0 8px;

      .name {
        padding-left: 6px;
      }
    }
  }
}
</style>
