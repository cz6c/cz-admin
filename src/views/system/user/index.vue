<template>
  <div class="page">
    <TableView
      ref="tableRef"
      :columns="columns"
      :getListApi="getListApi"
      :searchColumns="searchList"
      pagination
      title="用户列表"
      @selection-change="selectionChange"
    >
      <template #table-tools>
        <el-button type="primary" @click="add">新增用户</el-button>
      </template>
      <template #status="{ row }">
        <el-switch
          v-model="row.status"
          :active-value="1"
          :inactive-value="0"
          @click="statusChange(row.status, row.id)"
        />
      </template>
      <template #action="{ row }">
        <el-button link type="primary" size="small" @click="del(row.id)">Detail</el-button>
        <el-button link type="primary" size="small" @click="edit(row.id)">Edit</el-button>
      </template>
    </TableView>
    <UserDrawerEdit v-model="_isEdit" :id="_id" @update-list="tableRef?.getList" />
  </div>
</template>
<script setup lang="ts" name="User">
import { ref, reactive } from "vue";
import { TableCol, TableViewInstance } from "@/components/TableView/type";
import { SearchProps } from "@/components/SearchForm/type";
import { getUserListApi, statusChangeApi, delUserApi } from "@/api/system/user";
import { UserItem } from "@/api/system/user/index.d";
import UserDrawerEdit from "./components/UserDrawerEdit.vue";
import { ElMessageBox } from "element-plus";
import { $message } from "@/utils/message";

const getListApi = getUserListApi;
const delApi = delUserApi;
const statusApi = statusChangeApi;

const columns: TableCol<UserItem>[] = [
  {
    label: "username",
    prop: "username",
  },
  {
    label: "avatar",
    prop: "avatar",
  },
  {
    label: "roleId",
    prop: "roleId",
  },
  {
    label: "status",
    prop: "status",
  },
  {
    label: "createTime",
    prop: "createTime",
  },
  {
    label: "remark",
    prop: "remark",
  },
];
const searchList = reactive<SearchProps[]>([
  {
    el: "input",
    prop: "username",
    label: "username",
    defaultValue: "",
  },
  {
    el: "date-picker",
    defaultValue: "",
    prop: "createTime",
    label: "createTime",
    props: {
      type: "date",
    },
  },
  {
    el: "switch",
    prop: "delivery",
    label: "Instant delivery",
    defaultValue: 0,
  },
  {
    prop: "desc",
    label: "Activity form",
    el: "input",
    defaultValue: "",
    props: {
      type: "textarea",
    },
  },
]);

const tableRef = ref<TableViewInstance>();

/**
 * @description: 列表选中
 * @param {*} selection
 */
const selectList: any = ref([]);
function selectionChange(selection: any[]) {
  selectList.value = selection || [];
}

const _isEdit = ref(false);
const _id = ref(0);
/**
 * @description: 新增
 */
function add() {
  _id.value = 0;
  _isEdit.value = true;
}
/**
 * @description: 编辑
 * @param {*} id
 */
function edit(id: number) {
  _id.value = id;
  _isEdit.value = true;
}
/**
 * @description: 状态切换
 * @param {*} status
 * @param {*} id
 */
async function statusChange(status: 0 | 1, id: number) {
  console.log(id, status);
  try {
    await statusApi({ status, id });
    $message.success("切换成功");
    tableRef?.value?.getList();
  } catch (error: any) {
    $message.error(error.message);
  }
}
/**
 * @description: 删除
 * @param {*} id
 */
async function del(id: number) {
  ElMessageBox.confirm("proxy will permanently delete the file. Continue?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      try {
        await delApi({ id });
        tableRef?.value?.getList();
        $message.success(`Delete completed`);
      } catch (error: any) {
        $message.error(error.message);
      }
    })
    .catch(() => {
      $message.info(`Delete canceled`);
    });
}
</script>
