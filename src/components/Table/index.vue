<template>
  <div class="table-view" :style="{ height: props.tableHeight }">
    <div class="header-wrap">
      <div class="header-title">{{ props.title }}</div>
      <div class="header-operate">
        <slot name="operate"> </slot>
        <span class="icon-wrap" @click="getList">
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
    <div class="table-wrap">
      <el-table v-loading="loading" v-bind="props" :data="apiData" height="100%" row-key="id">
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
          v-bind="item"
        >
          <!-- <template #header="{ column, $index }">
          <div style="display: flex; align-items: center"></div>
        </template> -->
          <template #default="{ row }">
            <!-- switch开关 -->
            <template v-if="item.columnType === 'switch'">
              <el-switch v-model="row[item.prop]" />
            </template>
            <!-- column动态插槽 -->
            <template v-if="item.columnType === 'slot'">
              <slot :name="`column-${item.slotName}`" :data="row[item.prop]"></slot>
            </template>
            <!-- 文本显示 -->
            <template v-else>{{ item.formatData ? item.formatData(row[item.prop]) : row[item.prop] }}</template>
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="TableView">
import { defineProps, defineEmits, defineExpose, reactive, ref, onMounted } from "vue";
import tableProps from "./props";
import { isFunction } from "@/utils/is";

const props = defineProps(tableProps);
console.log(props);
const emits = defineEmits(["selectionChange", "sortChange", "rowDblclick", "currentChange"]);
console.log(emits);

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
  const { api, beforeFetch, afterFetch, pagination } = props;
  loading.value = true;
  let params = pagination ? { ...pageQuery, ...props.otherParams } : props.otherParams;
  if (beforeFetch && isFunction(beforeFetch)) {
    params = (await beforeFetch(params)) || params;
  }
  const { data } = api && (await api(params));
  if (afterFetch && isFunction(afterFetch)) {
    data.list = (await afterFetch(data.list)) || data.list;
  }
  apiData.value = data.list || [];
  listTotal.value = data.total;
  loading.value = false;
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
  background-color: #fff;
  padding: 0 8px;
  .header-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 8px;
    .header-title {
      font-size: 18px;
      font-weight: 600;
    }
    .icon-wrap {
      padding: 0 10px;
      font-size: 18px;
      cursor: pointer;
    }
  }
  .table-wrap {
    height: calc(100% - 100px);
  }
  .pagination-wrap {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
