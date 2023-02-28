<template>
  <div class="page">
    <div class="left-view">
      <tree />
    </div>
    <div class="right-view">
      <div class="search-wrap">
        <FormView
          ref="formView"
          v-model="tableSearch"
          :columns="2"
          labelWidth="126px"
          labelPosition="right"
          @sumbit="sumbit"
        />
      </div>
      <TableView
        ref="tableRef"
        :api="api"
        :columns="columns"
        :otherPerams="formData"
        title="用户列表"
        tableHeight="calc(100% - 100px)"
      >
        <template #column-name="{ data }"> {{ data }} </template>
      </TableView>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { TableJsonItem } from "@/components/Table/index.d";
import tree from "./components/Tree.vue";
import { getUserList } from "@/api/system";
import { FormJsonItem } from "@/utils/public";
import formFormat from "@/hooks/formFormat";

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
  },
  {
    label: "createTime",
    prop: "createTime",
    formatData: (data: any) => `${data}123`,
  },
  {
    label: "remark",
    prop: "remark",
  },
];
const api = getUserList;
const tableRef: any = ref(null);
const tableSearch: FormJsonItem[] = reactive([
  {
    prop: "name",
    label: "Activity name",
    data: "",
    initilaData: "Hello",
    rule: [{ min: 3, max: 6, message: "Length should be 3 to 6", trigger: "blur" }],
  },
  {
    prop: "time",
    label: "Activity time",
    data: "",
    initilaData: "",
    type: "date",
    elProps: {
      type: "date",
    },
  },
]);

const { formData } = formFormat({ rawList: tableSearch });
const sumbit = () => {
  tableRef.value.getList();
};
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left-view {
    flex: 0 0 260px;
    background-color: #fff;
    height: 100%;
    overflow-y: auto;
    margin-right: 16px;
  }
  .right-view {
    flex: 1;
    height: 100%;
    .search-wrap {
      height: 80px;
      background-color: #fff;
      margin-bottom: 16px;
    }
  }
}
</style>
