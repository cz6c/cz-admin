<template>
  <TableView
    ref="tableRef"
    :columns="columns"
    :getListApi="getListApi"
    :searchColumns="formList"
    pagination
    title="角色列表"
    @selection-change="selectionChange"
  >
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
</template>
<script setup lang="ts" name="Table">
import { ref, reactive } from "vue";
import { TableCol } from "@/components/TableView/type";
import { getRoleListApi } from "@/api/system/role";
import { RoleItem } from "@/api/system/role/index.d";
import { SearchProps } from "@/components/SearchForm/type";

const getListApi = getRoleListApi;
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

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
let selectList: any = ref([]);

const formList = reactive<SearchProps[]>([
  {
    el: "input",
    prop: "name",
    label: "Activity name",
    defaultValue: "Hello",
    props: {
      disabled: true,
    },
  },
  {
    el: "select",
    prop: "zone",
    label: "Activity zone",
    defaultValue: 1,
    options: [
      {
        label: "Zone one",
        value: 1,
      },
      {
        label: "Zone two",
        value: 0,
      },
    ],
  },
  {
    el: "select-v2",
    prop: "count",
    label: "Activity count",
    defaultValue: 1,
    options,
  },
  {
    el: "date-picker",
    defaultValue: "",
    prop: "time",
    label: "Activity time",
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

/**
 * @description: 列表选中
 * @param {*} selection
 */
function selectionChange(selection: any[]) {
  selectList.value = selection || [];
}
</script>
