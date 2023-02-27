<template>
  <div class="table-view" :style="{ height: props.tableHeight }">
    <div class="header-wrap">
      <div class="header-title">{{ props.title }}</div>
      <div class="header-operate">
        <slot name="operate"> </slot>
        <SvgIcon name="search" />
        <SvgIcon name="search" />
        <SvgIcon name="search" />
      </div>
    </div>
    <div class="table-wrap">
      <el-table v-loading="loading" v-bind="props" :data="apiData" height="100%">
        <template v-if="props.selectionColum">
          <el-table-column type="selection" />
        </template>
        <template v-if="props.indexColum">
          <el-table-column type="index" />
        </template>
        <template v-if="props.expandColum">
          <el-table-column type="expand" />
        </template>
        <el-table-column
          v-for="item in props.columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <!-- <template #header="{ column, $index }">
          <div style="display: flex; align-items: center"></div>
        </template> -->
          <template #default="{ row }">
            <!-- switch开关 -->
            <template v-if="item.type === 'switch'">
              <el-switch v-model="row[item.prop]" />
            </template>
            <!-- column动态插槽 -->
            <template v-if="item.type === 'slot'">
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
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="TableView">
import { defineProps, defineEmits, defineExpose, reactive, ref } from "vue";
import tableProps from "./props";

const props = defineProps(tableProps);
console.log(props);
const emits = defineEmits(["selectAll", "selectionChange", "sortChange", "dclick", "currentChange"]);
console.log(emits);

const loading = ref(true);
const apiData = ref([]);
const pageQuery = reactive({
  page: 1,
  limit: 15,
});
const total = ref(0);
/**
 * @description: 获取接口数据
 */
async function getList<T>(query?: T) {
  loading.value = true;
  console.log(props.api);
  const {
    data: { list, total: count },
  } = props.api && (await props.api({ ...pageQuery, ...query }));
  console.log(list, total);
  apiData.value = list;
  total.value = count;
  loading.value = false;
}
getList();
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
