<template>
  <div class="logo-container">
    <router-link key="props.collapse" :title="BASE_TITLE" class="logo-link" to="/">
      <SvgIcon name="logo" size="36" />
      <div v-if="!layoutStore.getIsCollapse" class="logo-title">{{ BASE_TITLE }}</div>
    </router-link>
  </div>
</template>
<script setup lang="ts" name="Logo">
import { BASE_TITLE } from "@/config";
import { useLayoutStore } from "@/store/modules/layout";

const layoutStore = useLayoutStore();
</script>

<style lang="scss" scoped>
.logo-container {
  position: relative;
  height: 48px;
  overflow: hidden;
  a {
    text-decoration: none;
  }
  .logo-link {
    height: 100%;
    display: flex;
    align-items: center;
    :deep(.svg-icon) {
      margin: 0 14px;
    }
    .logo-title {
      display: block;
      width: 136px;
      color: #1890ff;
      font-weight: 600;
      font-size: 20px;
    }
  }
}
</style>
