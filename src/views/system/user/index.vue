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
          :columns="3"
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
<script setup lang="ts" name="User">
import { ref, reactive } from "vue";
import { TableJsonItem } from "@/components/Table/index.d";
import tree from "./components/Tree.vue";
import { getUserList } from "@/api/system";
import { FormJsonItem } from "@/components/Form/index.d";
import { useForm } from "@/components/Form/hooks/useForm";
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
const tableSearch: FormJsonItem[] = reactive([
  {
    prop: "nickname",
    label: "nickname",
    data: "",
    initilaData: "",
  },
  {
    prop: "createTime",
    label: "createTime",
    data: "",
    initilaData: "",
    type: "date",
    elProps: {
      type: "date",
    },
  },
]);

const { formData } = useForm({ rawList: tableSearch });
const sumbit = () => {
  tableRef.value.getList();
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
    width: 260px;
    height: 100%;
    background-color: #fff;
  }

  .right-view {
    width: calc(100% - 260px);
    height: 100%;

    .search-wrap {
      margin-bottom: 16px;
      height: 80px;
      background-color: #fff;
    }
  }
}
</style>
