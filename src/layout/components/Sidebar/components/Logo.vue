<template>
  <div class="logo-container">
    <router-link key="props.collapse" :title="title" class="logo-link" to="/">
      <SvgIcon name="logo" size="36" />
      <div v-if="!props.isCollapse" class="logo-title">{{ title }}</div>
    </router-link>
  </div>
</template>
<script setup lang="ts" name="Logo">
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
});
const title = "czadmin";
</script>

<style lang="scss" scoped>
.logo-container {
  position: relative;
  height: 48px;
  overflow: hidden;
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
