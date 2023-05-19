<template>
  <div class="table-view cz-card" :style="{ height: props.tableHeight }">
    <TableAction :title="props.title" @update-list="getList">
      <template #tools>
        <slot name="tools"> </slot>
      </template>
    </TableAction>
    <div class="table-wrap">
      <el-table
        v-loading="loading"
        v-bind="props"
        :data="apiData"
        height="100%"
        row-key="id"
        @selection-change="selectionChange"
      >
        <template v-if="props.selectionColum">
          <el-table-column type="selection" :align="props.align" />
        </template>
        <template v-if="props.indexColum">
          <el-table-column type="index" label="序号" :align="props.align" />
        </template>
        <template v-if="props.expandColum">
          <el-table-column type="expand" :align="props.align" />
        </template>
        <el-table-column
          v-for="item in props.columns"
          :key="item.prop"
          :align="item.align || props.align"
          showOverflowTooltip
          v-bind="item"
        >
          <template #default="{ row }">
            <!-- column动态插槽 -->
            <template v-if="item.columnType === 'slot'">
              <slot :name="`column-${item.prop}`" :row="row"></slot>
            </template>
            <!-- 文本显示 -->
            <template v-else>{{ row[item.prop] }}</template>
          </template>
        </el-table-column>
        <!-- 插入至表格最后一行之后的内容， 如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。 若表格有合计行，该 slot 会位于合计行之上 -->
        <template #append>
          <slot name="append"></slot>
        </template>
        <!-- 当数据为空时自定义的内容 -->
        <template #empty>
          <slot name="empty"></slot>
        </template>
      </el-table>
    </div>
    <div class="pagination-wrap">
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
  </div>
</template>

<script setup lang="ts" name="TableView">
import { reactive, ref, onMounted } from "vue";
import { isFunction } from "@/utils/is";
import { $message } from "@/utils/message";
import TableAction from "./components/TableAction.vue";

interface TableJsonItem {
  columnType?: "text" | "slot";
  prop: string;
  align?: string;
}

interface Props {
  columns: Array<TableJsonItem>;
  api: Function;
  beforeFetch?: Function;
  afterFetch?: Function;
  otherParams?: any;
  pagination?: boolean;
  align?: string;
  title?: string;
  tableHeight?: string;
  indexColum?: boolean;
  selectionColum?: boolean;
  expandColum?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  otherParams: {},
  pagination: false,
  align: "center",
  title: "",
  tableHeight: "100%",
  indexColum: false,
  selectionColum: false,
  expandColum: false,
});
const emits = defineEmits(["selectionChange"]);

const selectionChange = (selection: any[]) => {
  emits("selectionChange", selection);
};

const loading = ref(true);
const apiData = ref([]);
const pageQuery = reactive({
  page: 1,
  limit: 15,
});
const listTotal = ref(0);
/**
 * @description: 获取接口数据
 */
async function getList() {
  try {
    const { api, beforeFetch, afterFetch, pagination } = props;
    loading.value = true;
    let params = pagination ? { ...pageQuery, ...props.otherParams } : props.otherParams;
    console.log(params);

    if (beforeFetch && isFunction(beforeFetch)) {
      params = (await beforeFetch(params)) || params;
    }
    const { data } = api && isFunction(api) && (await api(params));
    if (afterFetch && isFunction(afterFetch)) {
      data.list = (await afterFetch(data.list)) || data.list;
    }
    apiData.value = data.list || [];
    listTotal.value = data.total;
    setTimeout(() => {
      loading.value = false;
    }, 600);
  } catch (error: any) {
    loading.value = false;
    $message.warning(error.message);
  }
}
onMounted(() => {
  getList();
});
/**
 * @description: limit 改变
 */
function handleSizeChange(value: number) {
  pageQuery.limit = value;
  pageQuery.page = 1;
  getList();
}
/**
 * @description: page 改变
 */
function handleCurrentChange(value: number) {
  pageQuery.page = value;
  getList();
}

defineExpose({
  getList,
});
</script>

<style scoped lang="scss">
.table-view {
  padding: 0 8px;

  .table-wrap {
    height: calc(100% - 90px);
  }

  .pagination-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 40px;
  }
}
</style>
