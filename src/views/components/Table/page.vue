<template>
  <div class="page">
    <div class="search-wrap cz-card">
      <el-form :model="tableSearch">
        <el-form-item>
          <el-input v-model="tableSearch.roleName" placeholder="nickname" />
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="tableSearch.createTime" type="date" placeholder="createTime" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <TableView
      ref="tableRef"
      :api="api"
      :columns="columns"
      :otherParams="tableSearch"
      title="角色列表"
      tableHeight="calc(100% - 76px)"
      pagination
      selectionColum
      @selection-change="selectionChange"
    >
      <template #tools>
        <el-button type="primary">Add</el-button>
      </template>
      <template #column-roleName="{ row }"> {{ row.roleName }} </template>
      <template #column-status="{ row }">
        <el-switch v-model="row.status" :active-value="1" :inactive-value="0" />
      </template>
      <template #column-action="{ row }">
        <ElButton link type="primary" size="small">Detail</ElButton>
        <ElButton link type="primary" size="small">Edit</ElButton>
      </template>
    </TableView>
  </div>
</template>
<script setup lang="ts" name="Table">
import { ref, reactive } from "vue";
import { TableJsonItem } from "./index.d";
import TableView from "./index.vue";
import { getRoleListApi } from "@/api/system/role";

const api = getRoleListApi;
const columns: TableJsonItem[] = [
  {
    label: "roleName",
    prop: "roleName",
    columnType: "slot",
  },
  {
    label: "menuIds",
    prop: "menuIds",
  },
  {
    label: "status",
    prop: "status",
    columnType: "slot",
  },
  {
    label: "createTime",
    prop: "createTime",
  },
  {
    label: "remark",
    prop: "remark",
  },
  {
    label: "操作",
    prop: "action",
    columnType: "slot",
  },
];
const tableRef: any = ref(null);
let selectList: any = ref([]);
let tableSearch = reactive({
  roleName: "",
  createTime: "",
});
/**
 * @description: 搜索
 */
function search() {
  tableRef.value.getList();
}
/**
 * @description: 重置搜索
 */
function reset() {
  tableSearch.roleName = "";
  tableSearch.createTime = "";
  search();
}
/**
 * @description: 列表选中
 * @param {*} selection
 */
function selectionChange(selection: any[]) {
  selectList.value = selection || [];
}
</script>

<style lang="scss" scoped>
.page {
  height: 100%;

  .search-wrap {
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
}
</style>
