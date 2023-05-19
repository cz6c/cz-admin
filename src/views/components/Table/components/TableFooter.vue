<template>
  <div class="table-footer">
    <el-pagination
      v-model:current-page="pageQuery.page"
      v-model:page-size="pageQuery.limit"
      :page-sizes="[50, 100, 150, 200]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listTotal"
      small
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts" name="TableFooter">
const props = defineProps({
  title: {
    type: String,
  },
});
const emits = defineEmits(["updateList"]);
</script>

<style scoped lang="scss">
.pagination-wrap {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
}
</style>
