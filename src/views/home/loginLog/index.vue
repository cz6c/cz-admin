<template>
  <div class="login-log">
    <!-- 登录日志 -->
    <TableView
      ref="tableView"
      v-loading="loading"
      :tableData="tableData"
      :columnList="columnList"
      :listQuery="listQuery"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { getLoginLog } from "@api/home/index";
import { LoginLogInfo, ParamsLoginLogList } from "@api/home/index.d";

const loading = ref(false);
const tableData: LoginLogInfo[] = reactive([]);
const columnList = reactive([
  {
    prop: "userName",
    label: "操作账号",
  },
  {
    prop: "createTime",
    label: "日期",
    type: "timeStamp",
    width: 170,
  },
  {
    prop: "ip",
    label: "IP",
    width: "500",
  },
  {
    prop: "country",
    label: "地区",
    width: 200,
  },
  {
    prop: "name",
    label: "浏览器",
  },
]);
const listQuery: ParamsLoginLogList = reactive({
  page: 1,
  limit: 30,
  count: 0,
});
/**
 * @description: 获取日志接口列表
 * @param {*}
 * @return {*}
 */
async function getList() {
  loading.value = true;
  // const {
  //   data: { list, count },
  // } = await getLoginLog(listQuery);
  // listQuery.count = count || 0;
  // tableData = list || [];
  loading.value = false;
}
getList();
</script>

<style lang="scss" scoped>
.login-log {
  height: 100%;
}
</style>
