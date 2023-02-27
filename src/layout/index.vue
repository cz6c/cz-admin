<template>
  <el-container class="app-container">
    <el-aside :width="!isCollapse ? '200px' : '64px'">
      <Sidebar :isCollapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header height="50px">
        <Navbar :isCollapse="isCollapse" @toggle-click="toggleSideBar" />
      </el-header>
      <el-main>
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppMain from "./components/AppMain.vue";
import Sidebar from "./components/Sidebar/index.vue";
import Navbar from "./components/Navbar/index.vue";

const isCollapse = ref(false);
function toggleSideBar() {
  isCollapse.value = !isCollapse.value;
}
</script>

<style scoped lang="scss">
:deep(.el-container) {
  .el-header {
    border-bottom: 1px solid #d9d9d9;
    padding: 0;
  }
  .el-main {
    background: #f0f2f5;
    padding: 16px;
  }
}
</style>
