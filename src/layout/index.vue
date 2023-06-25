<template>
  <el-container class="app-container" direction="horizontal">
    <el-aside :width="!layoutStore.getIsCollapse ? '200px' : '64px'">
      <Sidebar />
    </el-aside>
    <el-container>
      <el-header height="50px">
        <Navbar @toggle-click="toggleSideBar" />
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
import { useLayoutStore } from "/@/store/modules/layout";

const layoutStore = useLayoutStore();

const isCollapse = ref(false);
function toggleSideBar() {
  isCollapse.value = !isCollapse.value;
}
</script>

<style scoped lang="scss">
:deep(.el-aside) {
  border-right: 1px solid #f2f2f2;
  background: var(--el-menu-bg-color);
}

:deep(.el-header) {
  border-right: 1px solid #f2f2f2;
  background: var(--el-menu-bg-color);
}

:deep(.el-main) {
  padding: 16px;
  background: #f7f7fb;

  .el-scrollbar__view {
    height: 100%;

    .page {
      height: 100%;
    }
  }
}
</style>
