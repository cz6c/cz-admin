<template>
  <div id="app">
    <FormView :columns="3" v-model="formList" @sumbit="sumbit" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import FormView from "./components/FormView.vue";
import { formJsonItem } from "./components/type";
interface userInfo {
  name: String;
  age: String;
  sex: String;
}
const formList: formJsonItem[] = reactive([
  {
    prop: "name",
    label: "姓名",
    data: "",
  },
  {
    prop: "age",
    label: "年龄",
    data: "",
    type: "date",
  },
  {
    prop: "sex",
    label: "性别",
    data: "",
    type: "select",
    itemContentWidth: "100%",
    itemLabelWidth: "60px",
    option: [
      {
        label: "男",
        value: "1",
      },
      {
        label: "女",
        value: "0",
      },
    ],
  },
]);
const sumbit = (payload: userInfo) => {
  console.log("submit!", payload);
};
</script>

<style></style>
