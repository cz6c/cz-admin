<template>
  <div class="page">
    <div class="search-wrap cz-card">
      <el-form :model="tableSearch">
        <el-form-item>
          <el-input v-model="tableSearch.deptName" placeholder="nickname" />
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
      title="部门列表"
      tableHeight="calc(100% - 76px)"
      pagination
      selectionColum
      @selection-change="selectionChange"
    >
      <template #tools>
        <el-button type="primary" @click="isEdit = true">新增部门</el-button>
      </template>
      <template #column-deptName="{ data }"> {{ data }} </template>
    </TableView>
    <DeptDrawerEdit v-model="isEdit" />
  </div>
</template>
<script setup lang="ts" name="Dept">
import { ref, reactive } from "vue";
import { TableJsonItem } from "@/components/Table/index.d";
import { getDeptList } from "@/api/system";
import dayjs from "dayjs";
import DeptDrawerEdit from "./components/DeptDrawerEdit.vue";

const isEdit = ref(false);
const api = getDeptList;
const columns: TableJsonItem[] = [
  {
    label: "deptName",
    prop: "deptName",
    columnType: "slot",
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
  deptName: "",
  createTime: "",
});
const sumbit = () => {
  tableRef.value.getList();
};
const reset = () => {
  tableSearch.deptName = "";
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
