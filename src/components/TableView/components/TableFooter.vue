<script setup lang="ts" name="TableFooter">
import { GetListParams } from "/@/api/public/index.d";

interface PaginationProps {
  pageQuery: GetListParams;
  handleSizeChange: (size: number) => void;
  handleCurrentChange: (currentPage: number) => void;
}

defineProps<PaginationProps>();
</script>
<template>
  <div class="table-footer">
    <!-- 分页组件 -->
    <el-pagination
      :current-page="pageQuery.page"
      :page-size="pageQuery.limit"
      :total="pageQuery.total"
      :page-sizes="[10, 25, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<style lang="scss" scoped>
.table-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
}
</style>
