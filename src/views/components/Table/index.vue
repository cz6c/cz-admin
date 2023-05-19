<script lang="ts" setup>
import { ComputedRef, computed, ref } from "vue";
import TableColumn from "./TableColumn.vue";
import { ElTable } from "element-plus";
import Table from "./index.d";

interface TableProps {
  tableData: Array<object>; // table的数据
  columns: Table.TableJsonItem[]; // 每列的配置项
  options?: Table.TableOptions;
}
const props = defineProps<TableProps>();
const tableRef = ref<InstanceType<typeof ElTable>>();
// 设置option默认值，如果传入自定义的配置则合并option配置项
const _options: ComputedRef<Table.TableOptions> = computed(() => {
  const option = {
    stripe: false,
    tooltipEffect: "dark",
    showHeader: true,
    pagination: false,
    rowStyle: () => "cursor:pointer", // 行样式
  };
  return Object.assign(option, props?.options);
});
// 合并分页配置
const _paginationConfig = computed(() => {
  const config = {
    total: 0,
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30, 40, 50, 100],
    layout: "total, sizes, prev, pager, next, jumper",
  };
  return Object.assign(config, _options.value.paginationConfig);
});
const emit = defineEmits([
  "selection-change", // 当选择项发生变化时会触发该事件
  "row-click", // 当某一行被点击时会触发该事件
  "cell-click", // 当某个单元格被点击时会触发该事件
  "command", // 按钮组事件
  "size-change", // pageSize事件
  "current-change", // currentPage按钮组事件
  "pagination-change", // currentPage或者pageSize改变触发
]);
// 切换pageSize
const pageSizeChange = (pageSize: number) => {
  emit("size-change", pageSize);
  emit("pagination-change", 1, pageSize);
};
// 切换currentPage
const currentPageChange = (currentPage: number) => {
  emit("current-change", currentPage);
  emit("pagination-change", currentPage, _paginationConfig.value.pageSize);
};
// 多选事件
const handleSelectionChange = (val: any) => {
  emit("selection-change", val);
};
// 当某一行被点击时会触发该事件
const handleRowClick = (row: any, column: any, event: MouseEvent) => {
  emit("row-click", row, column, event);
};
// 当某个单元格被点击时会触发该事件
const handleCellClick = (row: any, column: any, cell: any, event: MouseEvent) => {
  emit("cell-click", row, column, cell, event);
};
// 暴露给父组件参数和方法，如果外部需要更多的参数或者方法，都可以从这里暴露出去。
defineExpose({ element: tableRef });
</script>
<template>
  <div>
    <el-table
      ref="tableRef"
      :data="tableData"
      v-bind="_options"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      @cell-click="handleCellClick"
    >
      <template v-for="col in columns" :key="col.prop">
        <!---复选框, 序号 (START)-->
        <el-table-column v-if="['index', 'selection', 'expand'].includes(col.type!)" v-bind="col">
          <!-- 当type等于expand时， 配置通过h函数渲染、txs语法或者插槽自定义内容 -->
          <template #default="{ row, $index }">
            <component v-if="col.render" :is="col.render" :row="row" :index="$index" />
            <slot v-else-if="col.slot" name="expand" :row="row" :index="$index"></slot>
          </template>
        </el-table-column>
        <!---复选框, 序号 (END)-->
        <!-- 渲染插槽 START -->
        <TableColumn :col="col" v-else>
          <template v-for="slot in Object.keys($slots)" #[slot]="scope: Record<string, any>">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </TableColumn>
        <!-- 渲染插槽 END -->
      </template>
    </el-table>
    <!-- 分页器 -->
    <div v-if="_options.pagination" class="mt20">
      <el-pagination v-bind="_paginationConfig" @size-change="pageSizeChange" @current-change="currentPageChange" />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
