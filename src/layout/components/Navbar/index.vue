<template>
  <div class="navbar">
    <div class="navbar-left">
      <div class="collapse navbar-hover" :title="props.isCollapse ? '点击展开' : '点击折叠'" @click="toggleClick">
        <SvgIcon name="dashboard" icon="36" />
      </div>
      <Breadcrumb class="breadcrumb-container" />
    </div>
    <div class="navbar-right">
      <!-- 退出登录 -->
      <el-dropdown trigger="click">
        <span class="user-info navbar-hover">
          <el-avatar
            :size="36"
            fit="cover"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          />
          <p v-if="username" class="name">{{ username }}</p>
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

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import Breadcrumb from "./BreadCrumb.vue";

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["toggleClick"]);

const toggleClick = () => {
  emit("toggleClick");
};
const username = "czadmin";
function logout() {
  console.log("logout");
}
</script>

<style scoped lang="scss">
.navbar {
  height: 100%;
  display: flex;
  justify-content: space-between;
  &-left,
  &-right {
    height: 100%;
    display: flex;
    align-items: center;
  }
  &-hover {
    height: 100%;
    display: flex;
    align-items: center;
    &:hover {
      cursor: pointer;
      background-color: #f6f6f6;
    }
  }
  &-left {
    .collapse {
      padding: 0 10px;
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
