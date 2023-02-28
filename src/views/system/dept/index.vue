<template>
  <div class="page">
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
      :otherParams="formData"
      title="部门列表"
      tableHeight="calc(100% - 100px)"
    >
      <template #column-name="{ data }"> {{ data }} </template>
    </TableView>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { TableJsonItem } from "@/components/Table/index.d";
import { getDeptList } from "@/api/system";
import { FormJsonItem } from "@/utils/public";
import formFormat from "@/hooks/formFormat";

const api = getDeptList;
const columns: TableJsonItem[] = [
  {
    label: "deptName",
    prop: "deptName",
    columnType: "slot",
    slotName: "name",
  },
  {
    label: "orderNo",
    prop: "orderNo",
  },
  {
    label: "status",
    prop: "status",
    columnType: "switch",
  },
  {
    label: "createTime",
    prop: "createTime",
    formatData: (data: any) => {
      return data + "123";
    },
  },
  {
    label: "remark",
    prop: "remark",
  },
];
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
  .search-wrap {
    height: 80px;
    background-color: #fff;
    margin-bottom: 20px;
  }
}
</style>
