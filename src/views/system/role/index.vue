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
          <el-button type="primary" @click="sumbit">搜索</el-button>
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
      <template #column-name="{ data }"> {{ data }} </template>
    </TableView>
  </div>
</template>
<script setup lang="ts" name="Role">
import { ref, reactive } from "vue";
import { TableJsonItem } from "@/components/Table/index.d";
import { getRoleList } from "@/api/system";
import dayjs from "dayjs";

const api = getRoleList;
const columns: TableJsonItem[] = [
  {
    label: "orderNo",
    prop: "orderNo",
    columnType: "slot",
    slotName: "name",
  },
  {
    label: "roleName",
    prop: "roleName",
  },
  {
    label: "roleValue",
    prop: "roleValue",
  },
  {
    label: "menu",
    prop: "menu",
  },
  {
    label: "status",
    prop: "status",
    columnType: "switch",
    elProps: {
      activeText: "已启用",
      inactiveText: "已禁用",
    },
  },
  {
    label: "createTime",
    prop: "createTime",
    formatData: (data: number) => dayjs(data).format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    label: "remark",
    prop: "remark",
  },
];
const tableRef: any = ref(null);
let selectList = [];
let tableSearch = reactive({
  roleName: "",
  createTime: "",
});

const sumbit = () => {
  tableRef.value.getList();
};
const reset = () => {
  tableSearch.roleName = "";
  tableSearch.createTime = "";
  tableRef.value.getList();
};
const selectionChange = (selection: any[]) => {
  selectList = selection || [];
};
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
