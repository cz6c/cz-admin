<template>
  <div class="list-page">
    <div class="search-view cz-card">
      <slot name="search"></slot>
    </div>
    <div class="table-view cz-card" v-loading="loading">
      <div class="table-header">
        <div class="header-title">{{ props.title }}</div>
        <div class="header-operate">
          <slot name="action"> </slot>
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
      <div class="table-body">
        <slot name="table"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="ListContainer">
const props = defineProps({
  title: {
    type: String,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["updateList"]);
</script>

<style lang="scss" scoped>
.list-page {
  display: flex;
  height: 100%;
  flex-direction: column;

  .search-view {
    padding: 0 16px;
    height: 60px;

    :deep(.el-form) {
      display: flex;
      align-items: center;
      height: 100%;

      .el-form-item {
        margin-bottom: 0;
      }

      .el-form-item + .el-form-item {
        margin-left: 10px;
      }
    }
  }

  .table-view {
    margin-top: 16px;
    padding: 0 8px;
    height: calc(100% - 76px);

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
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

    .table-body {
      height: calc(100% - 50px);

      :deep(.el-table__inner-wrapper) {
        height: 100% !important;
      }
    }
  }
}
</style>
