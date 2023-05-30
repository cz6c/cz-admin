<script lang="ts" setup>
import { ref } from "vue";
import { ElTable } from "element-plus";
import TableAction from "./components/TableAction.vue";
import TableColumn from "./components/TableColumn.vue";
import TableFooter from "./components/TableFooter.vue";
import { TableCol } from "./type";
import { useTable } from "./useTable";
import { SearchProps } from "@/components/SearchForm/type";

// 表格配置
export interface TableProps {
  columns: TableCol[]; // 列配置项  ==> 必传
  data?: any[]; // data
  getListApi?: (params: any) => Promise<any>;
  beforeFetch?: (params: any) => any; // 列表搜索参数处理方法
  afterFetch?: (data: any) => any; // 列表数据处理方法
  searchColumns?: SearchProps[]; // 搜索配置项
  title?: string;
  pagination?: boolean; // 是否展示分页器
  rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染。
}

const props = withDefaults(defineProps<TableProps>(), {
  title: "",
  pagination: false,
  rowKey: "id",
});

const { loading, apiQuery, tableData, searchParam, reset, getList } = useTable(props);

const tableRef = ref<InstanceType<typeof ElTable>>();

// 切换pageSize
const pageSizeChange = (pageSize: number) => {
  apiQuery.value.page = 1;
  apiQuery.value.limit = pageSize;
  getList();
};
// 切换currentPage
const currentPageChange = (currentPage: number) => {
  apiQuery.value.page = currentPage;
  getList();
};
const emits = defineEmits([
  "selection-change", // 当选择项发生变化时会触发该事件
  "row-click", // 当某一行被点击时会触发该事件
]);
// 多选事件
const handleSelectionChange = (val: any) => {
  emits("selection-change", val);
};
// 当某一行被点击时会触发该事件
const handleRowClick = (row: any, column: any, event: MouseEvent) => {
  emits("row-click", row, column, event);
};
// 暴露给父组件参数和方法，如果外部需要更多的参数或者方法，都可以从这里暴露出去。
defineExpose({ element: tableRef });
</script>
<template>
  <div class="table-view">
    <div class="table-search cz-card" v-if="columns.length">
      <SearchForm
        ref="formView"
        :columns="searchColumns"
        :search-param="searchParam"
        @search="getList"
        @reset="reset"
      />
    </div>
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
        v-bind="$attrs"
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
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;

  .table-search {
    margin-bottom: 10px;
    padding: 18px 18px 0;
  }

  .table-main {
    padding: 0 16px;
    box-sizing: border-box;
    height: calc(100% - 78px);
  }
}

// el-table 表格样式
::v-deep(.el-table) {
  height: calc(100% - 100px);
}
</style>
