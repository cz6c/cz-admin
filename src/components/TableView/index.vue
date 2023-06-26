<script lang="ts" setup name="TableView">
import { ElTable } from "element-plus";
import TableHeader from "./components/TableHeader.vue";
import TableColumn from "./components/TableColumn.vue";
import TableFooter from "./components/TableFooter.vue";
import { TableCol } from "./type";
import { useTable } from "./useTable";
import { SearchProps } from "/@/components/SearchForm/type";
import { cloneDeep } from "lodash-es";

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

const { loading, apiQuery, tableData, searchParam, reset, getList, pageSizeChange, currentPageChange } =
  useTable(props);

const tableRef = ref<InstanceType<typeof ElTable>>();

/**
 * @description: 更新columns
 */
const checkedColumns = ref<TableCol[]>([]);
checkedColumns.value = cloneDeep(props.columns);
function handleColumnChange(data: TableCol[]) {
  checkedColumns.value = data;
}

/**
 * @description: 列表事件传递
 */
const emits = defineEmits([
  "selection-change", // 当选择项发生变化时会触发该事件
  "row-click", // 当某一行被点击时会触发该事件
]);
const handleSelectionChange = (val: any) => {
  emits("selection-change", val);
};
const handleRowClick = (row: any, column: any, event: MouseEvent) => {
  emits("row-click", row, column, event);
};
// 暴露给父组件参数和方法
defineExpose({ getList });
</script>
<template>
  <div class="table-view">
    <div class="table-search cz-card" v-if="props.searchColumns!.length">
      <SearchForm
        ref="formView"
        :columns="props.searchColumns"
        :search-param="searchParam"
        @search="getList"
        @reset="reset"
      />
    </div>
    <div class="table-main cz-card" v-loading="loading">
      <!-- 表格头部 -->
      <TableHeader
        :title="props.title"
        :columns="props.columns"
        @columns-change="handleColumnChange"
        @update-list="getList"
      >
        <template #tools>
          <slot name="table-tools"> </slot>
        </template>
      </TableHeader>
      <!-- 表格主体 -->
      <el-table
        ref="tableRef"
        v-bind="$attrs"
        :data="props.data ?? tableData"
        :rowKey="props.rowKey ?? 'id'"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
      >
        <template v-for="item in checkedColumns" :key="item">
          <!-- selection || index || expand -->
          <el-table-column
            v-bind="item"
            :align="item.align ?? 'center'"
            :reserve-selection="item.type == 'selection'"
            v-if="(item.type && ['selection', 'index', 'expand'].includes(item.type)) || item.visible"
          >
            <template #default="scope" v-if="item.type == 'expand'">
              <component :is="item.render" v-bind="scope" v-if="item.render" />
              <slot :name="item.type" v-bind="scope" v-else></slot>
            </template>
          </el-table-column>
          <!-- other -->
          <TableColumn v-if="(!item.type && item.prop) || item.visible" :column="item">
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
    display: flex;
    overflow: hidden;
    padding: 0 16px;
    box-sizing: border-box;
    flex: 1;
    flex-direction: column;
  }
}

// el-table 表格样式
::v-deep(.el-table) {
  flex: 1;
}
</style>
