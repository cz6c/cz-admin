<template>
  <div class="page">
    <TableView
      ref="tableRef"
      :data="data"
      :columns="columns"
      title="角色列表"
      pagination
      :pageQuery="apiQuery"
      selectionColum
      @selection-change="selectionChange"
    >
      <template #table-search>
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
      </template>
      <template #table-tools>
        <el-button type="primary">Add</el-button>
      </template>
      <template #roleName="{ row }"> {{ row.roleName }} </template>
      <template #status="{ row }">
        <el-switch v-model="row.status" :active-value="1" :inactive-value="0" />
      </template>
      <template #action>
        <ElButton link type="primary" size="small">Detail</ElButton>
        <ElButton link type="primary" size="small">Edit</ElButton>
      </template>
    </TableView>
  </div>
</template>
<script setup lang="ts" name="Table">
import { ref, reactive, onMounted } from "vue";
import { TableCol } from "./index.d";
import TableView from "./index.vue";
import { getRoleListApi } from "@/api/system/role";
import { RoleItem } from "@/api/system/role/index.d";

const data = ref<RoleItem[]>([]);
const columns: TableCol<RoleItem>[] = [
  {
    label: "roleName",
    prop: "roleName",
  },
  {
    label: "menuIds",
    prop: "menuIds",
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
  {
    label: "操作",
    prop: "action",
  },
];
const tableRef: any = ref(null);
const apiQuery = {
  page: 1,
  limit: 15,
  total: 0,
};
let selectList: any = ref([]);
let tableSearch = reactive({
  roleName: "",
  createTime: "",
});
onMounted(() => {
  getList();
});
async function getList() {
  try {
    const {
      data: { list },
    } = await getRoleListApi(apiQuery);
    data.value = list || [];
  } catch (error) {}
}
/**
 * @description: 搜索
 */
function search() {
  getList();
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
}
</style>
