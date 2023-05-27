<script lang="ts" setup>
import { ref } from "vue";
import { ElTable } from "element-plus";
import TableAction from "./components/TableAction.vue";
import TableColumn from "./components/TableColumn.vue";
import TableFooter from "./components/TableFooter.vue";
import { TableCol } from "./index.d";
import { useTable } from "./useTable";

// 表格配置
export interface TableProps {
  columns: TableCol[]; // 列配置项  ==> 必传
  data?: any[]; // data
  getListApi?: (params: any) => Promise<any>;
  afterFetch?: (data: any) => any;
  title?: string;
  pagination?: boolean; // 是否展示分页器
  height?: string | number;
  stripe?: boolean; // 是否为斑马纹  默认false
  size?: "large" | "default" | "small"; // Table 的尺寸
  rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染。
}

const props = withDefaults(defineProps<TableProps>(), {
  title: "",
  pagination: false,
  height: "100%",
  rowKey: "id",
});

const { loading, apiQuery, tableData, getList } = useTable(props);

const tableRef = ref<InstanceType<typeof ElTable>>();

const emit = defineEmits([
  "selection-change", // 当选择项发生变化时会触发该事件
  "row-click", // 当某一行被点击时会触发该事件
]);
// 切换pageSize
const pageSizeChange = (pageSize: number) => {
  console.log(pageSize);
  apiQuery.value.page = 1;
  apiQuery.value.limit = pageSize;
  getList();
};
// 切换currentPage
const currentPageChange = (currentPage: number) => {
  console.log(currentPage);
  apiQuery.value.page = currentPage;
  getList();
};
// 多选事件
const handleSelectionChange = (val: any) => {
  emit("selection-change", val);
};
// 当某一行被点击时会触发该事件
const handleRowClick = (row: any, column: any, event: MouseEvent) => {
  emit("row-click", row, column, event);
};
// 暴露给父组件参数和方法，如果外部需要更多的参数或者方法，都可以从这里暴露出去。
defineExpose({ element: tableRef });
</script>
<template>
  <div class="table-view">
    <div class="table-search cz-card"></div>
    <div class="table-main cz-card" v-loading="loading">
      <!-- 表格头部 -->
      <TableAction :title="props.title" @update-list="getList">
        <template #tools>
          <slot name="table-tools"> </slot>
        </template>
      </TableAction>
      <!-- 表格主体 -->
      <el-table
        ref="tableRef"
        v-bind="props"
        :data="data ?? tableData"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
      >
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
        <!-- 默认插槽 -->
        <slot></slot>
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
        :pageQuery="apiQuery"
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
