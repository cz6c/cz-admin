<template>
  <el-container class="app-container">
    <el-aside :width="!isCollapse ? '200px' : '64px'">
      <Sidebar :isCollapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header :height="isShowTags ? '88px' : '50px'">
        <Navbar :isCollapse="isCollapse" @toggle-click="toggleSideBar" />
        <MultiplTags v-if="isShowTags" />
      </el-header>
      <el-main>
        <el-scrollbar>
          <AppMain />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="Layout">
import { ref } from "vue";
import AppMain from "./components/AppMain.vue";
import Sidebar from "./components/Sidebar/index.vue";
import Navbar from "./components/Navbar/index.vue";
import MultiplTags from "./components/MultiplTags/index.vue";
import { isShowTags } from "@/config";

const isCollapse = ref(false);
function toggleSideBar() {
  isCollapse.value = !isCollapse.value;
}
</script>

<style scoped lang="scss">
:deep(.el-container) {
  .el-header {
    padding: 0;
  }
  .el-main {
    background: #f0f2f5;
    padding: 16px;
    .el-scrollbar__view {
      height: 100%;
    }
  }
}
</style>
