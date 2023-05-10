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
      <template #tools>
        <el-button type="primary" @click="isEdit = true">新增角色</el-button>
      </template>
      <template #column-roleName="{ data }"> {{ data }} </template>
    </TableView>
    <RoleDrawerEdit v-model="isEdit" />
  </div>
</template>
<script setup lang="ts" name="Role">
import { ref, reactive } from "vue";
import { TableJsonItem } from "@/components/Table/index.d";
import { getRoleList } from "@/api/system/role";
import dayjs from "dayjs";
import RoleDrawerEdit from "./components/RoleDrawerEdit.vue";

const isEdit = ref(false);
const api = getRoleList;
const columns: TableJsonItem[] = [
  {
    label: "roleName",
    prop: "roleName",
    columnType: "slot",
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
let selectList: any = ref([]);
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
  selectList.value = selection || [];
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
