<template>
  <div id="app">
    <FormView ref="formView" :columns="3" v-model="formList" @sumbit="sumbit" />
    <div>
      <el-button type="primary" @click="getUserInfo">getUserInfo </el-button>
      {{ auth.userName }}{{ auth.id }}{{ auth.newName }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import FormView from "./components/FormView.vue";
import { formJsonItem } from "./utils/public";
import formFormat from "./hooks/formFormat";
import { authStore } from "./store/index";
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
    initilaData: "cz6",
    required: true,
  },
  {
    prop: "age",
    label: "生日",
    data: "",
    initilaData: "27",
    required: true,
    // type: "date",
    // elProps: {
    //   type: "year",
    // },
  },
  {
    prop: "sex",
    label: "性别",
    data: "",
    initilaData: "1",
    required: true,
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

const { formDataMap } = formFormat({ rawList: formList });

onMounted(() => {
  console.log(formDataMap.value.name);
  // formDataMap.value.name.data = 1;
});
const sumbit = (payload: userInfo) => {
  console.log("submit!", payload);
};

const auth = authStore();
const getUserInfo = () => {
  auth.getUserInfo();
};
console.log(auth);
</script>

<style></style>
