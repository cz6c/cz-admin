<script lang="ts" setup>
import { ref } from "vue";
import { ElTable } from "element-plus";
import TableAction from "./components/TableAction.vue";
import TableColumn from "./components/TableColumn.vue";
import TableFooter from "./components/TableFooter.vue";
import { GetListParams } from "@/api/public/index.d";
import { TableCol } from "./index.d";

// 表格配置
interface TableProps {
  columns: TableCol[]; // 列配置项  ==> 必传
  data?: any[]; // 静态 table data 数据，若存在则不会使用 requestApi 返回的 data ==> 非必传
  title?: string;
  height?: string | number;
  // Table 的高度， 默认为自动高度。 如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。
  stripe?: boolean; // 是否为斑马纹 table
  maxHeight?: string | number; // Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
  size?: "large" | "default" | "small"; // Table 的尺寸
  showHeader?: boolean; // 是否显示表头,
  tooltipEffect?: "dark" | "light"; // tooltip effect 属性
  pagination?: boolean; // 是否展示分页器
  pageQuery?: GetListParams;
  rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染。
}

const props = withDefaults(defineProps<TableProps>(), {
  title: "",
  height: "100%",
  rowKey: "id",
});

const tableRef = ref<InstanceType<typeof ElTable>>();

const emit = defineEmits([
  "selection-change", // 当选择项发生变化时会触发该事件
  "row-click", // 当某一行被点击时会触发该事件
  "cell-click", // 当某个单元格被点击时会触发该事件
  "command", // 按钮组事件
  "size-change", // pageSize事件
  "current-change", // currentPage按钮组事件
  "pagination-change", // currentPage或者pageSize改变触发
  "updete-list", // currentPage或者pageSize改变触发
]);
// 切换pageSize
const pageSizeChange = (pageSize: number) => {
  emit("size-change", pageSize);
  emit("pagination-change", 1, pageSize);
};
// 切换currentPage
const currentPageChange = (currentPage: number) => {
  emit("current-change", currentPage);
  emit("pagination-change", currentPage, props.pageQuery?.page);
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
  <div class="table-view">
    <div class="table-search cz-card"></div>
    <div class="table-main cz-card">
      <TableAction :title="props?.title" @update-list="$emit('updete-list')">
        <template #tools>
          <slot name="table-tools"> </slot>
        </template>
      </TableAction>
      <!-- 表格主体 -->
      <el-table
        ref="tableRef"
        v-bind="props"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
        @cell-click="handleCellClick"
      >
        <!-- 默认插槽 -->
        <slot></slot>
        <template v-for="item in props.columns" :key="item">
          <!-- selection || index || expand -->
          <el-table-column
            v-bind="item"
            :align="item.align ?? 'center'"
            :reserve-selection="item.type == 'selection'"
            v-if="item.type && ['selection', 'index', 'expand'].includes(item.type)"
          >
            <template #default="scope" v-if="item.type == 'expand'">
              <component :is="item.render" v-bind="scope" v-if="item.render" />
              <slot :name="item.type" v-bind="scope" v-else></slot>
            </template>
          </el-table-column>
          <!-- other -->
          <TableColumn v-if="!item.type && item.prop" :column="item">
            <template v-for="slot in Object.keys($slots)" #[slot]="scope">
              <slot :name="slot" v-bind="scope"></slot>
            </template>
          </TableColumn>
        </template>
        <!-- 插入表格最后一行之后的插槽 -->
        <template #append>
          <slot name="append"> </slot>
        </template>
        <!-- 无数据 -->
        <template #empty>
          <div class="table-empty">
            <slot name="empty"> </slot>
          </div>
        </template>
      </el-table>
      <!-- 分页器 -->
      <TableFooter
        v-if="props.pagination"
        :pageQuery="props.pageQuery!"
        :handleSizeChange="pageSizeChange"
        :handleCurrentChange="currentPageChange"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.table-view {
  height: 100%;

  .table-search {
    margin-bottom: 16px;
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

  .table-main {
    display: flex;
    height: calc(100% - 76px);
    flex-direction: column;
  }
}
</style>
