<template>
  <div class="side-bar">
    <div class="logo-wrap">
      <Logo />
    </div>
    <div class="side-menu">
      <SideMenu />
    </div>
    <div class="code-info">
      <div v-if="!layoutStore.getIsCollapse" class="des">技术支持：cz6</div>
      <div
        class="collapse"
        :class="{ active: layoutStore.getIsCollapse }"
        :title="layoutStore.getIsCollapse ? '点击展开' : '点击折叠'"
        @click="toggleClick"
      >
        <SvgIcon name="collapse" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Sidebar">
import SideMenu from "./components/SideMenu.vue";
import { useLayoutStore } from "@/store/modules/layout";
import Logo from "../Sidebar/components/Logo.vue";

const layoutStore = useLayoutStore();

function toggleClick() {
  layoutStore.setIsCollapse(!layoutStore.getIsCollapse);
}
</script>

<style lang="scss" scoped>
.side-bar {
  height: 100%;

  .logo-wrap {
    height: 50px;
  }

  .side-menu {
    height: calc(100% - 94px);
  }

  .code-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    font-size: 12px;

    .des {
      padding-left: 12px;
      color: var(--el-color-info);
    }

    .collapse {
      width: 64px;
      text-align: center;
      cursor: pointer;

      &.active {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
