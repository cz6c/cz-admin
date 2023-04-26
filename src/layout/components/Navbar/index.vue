<template>
  <div class="navbar">
    <div class="navbar-left">
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

const { webLogout } = useAuthStore();

const router = useRouter();

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
  height: 100%;

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
