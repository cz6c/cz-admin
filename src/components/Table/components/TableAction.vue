<template>
  <div class="table-action">
    <div class="header-title">{{ props.title }}</div>
    <div class="header-operate">
      <slot name="tools"> </slot>
      <div class="icons">
        <span class="icon-wrap" @click="emits('updateList')">
          <el-icon><Refresh /></el-icon>
        </span>
        <el-dropdown trigger="click">
          <span class="icon-wrap">
            <el-icon><Setting /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item> Action 2 </el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="TableAction">
const props = defineProps({
  title: {
    type: String,
  },
});
const emits = defineEmits(["updateList"]);
</script>

<style scoped lang="scss">
.table-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  height: 50px;

  .header-title {
    font-size: 18px;
    font-weight: 600;
  }

  .header-operate {
    display: flex;
    align-items: center;
    height: 100%;

    .icons {
      display: flex;
      padding-left: 8px;

      .icon-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
}
</style>
