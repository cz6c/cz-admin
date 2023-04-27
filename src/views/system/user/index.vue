<template>
  <div class="page">
    <div class="left-view cz-card">
      <tree />
    </div>
    <div class="right-view">
      <div class="search-wrap cz-card">
        <el-form :model="tableSearch">
          <el-form-item>
            <el-input v-model="tableSearch.nickname" placeholder="nickname" />
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
        title="用户列表"
        tableHeight="calc(100% - 76px)"
        pagination
        selectionColum
        @selection-change="selectionChange"
      >
        <template #column-name="{ data }"> {{ data }} </template>
      </TableView>
    </div>
  </div>
</template>
<script setup lang="ts" name="User">
import { ref, reactive } from "vue";
import { TableJsonItem } from "@/components/Table/index.d";
import tree from "./components/Tree.vue";
import { getUserList } from "@/api/system";
import dayjs from "dayjs";

const columns: TableJsonItem[] = [
  {
    label: "account",
    prop: "account",
    columnType: "slot",
    slotName: "name",
  },
  {
    label: "email",
    prop: "email",
  },
  {
    label: "nickname",
    prop: "nickname",
  },
  {
    label: "role",
    prop: "role",
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
const api = getUserList;
const tableRef: any = ref(null);
let selectList = [];
let tableSearch = reactive({
  nickname: "",
  createTime: "",
});

const sumbit = () => {
  tableRef.value.getList();
};
const reset = () => {
  tableSearch.nickname = "";
  tableSearch.createTime = "";
  tableRef.value.getList();
};
const selectionChange = (selection: any[]) => {
  selectList = selection || [];
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  .left-view {
    overflow-y: auto;
    margin-right: 16px;
    width: 240px;
    height: 100%;
  }

  .right-view {
    width: calc(100% - 256px);
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
}
</style>
