<template>
  <div class="main">
    <TableView :data="list" :columnList="column">
      <template #name> TableView> </template>
    </TableView>
    <tree />
    <div>
      <el-form ref="formRef" :inline="true" :model="form">
        <el-form-item label="用户名称：" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名称" clearable class="!w-[160px]" />
        </el-form-item>
        <el-form-item label="手机号码：" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号码" clearable class="!w-[160px]" />
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select v-model="form.status" placeholder="请选择" clearable class="!w-[160px]">
            <el-option label="已开启" value="1" />
            <el-option label="已关闭" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" :loading="loading" @click="onSearch"> 搜索 </el-button> -->
          <el-button @click="resetForm(formRef)"> 重置 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import tree from "./tree.vue";
import { getUserList } from "@/api/system";

const formRef = ref();
const form = reactive({
  username: "",
  mobile: "",
  status: "",
});
const loading = ref(true);
const list = ref([]);
const column = reactive([
  {
    label: "account",
    prop: "account",
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
    label: "createTime",
    prop: "createTime",
  },
  {
    label: "remark",
    prop: "remark",
  },
]);

getList();

const resetForm = formEl => {
  if (!formEl) return;
  formEl.resetFields();
  getList();
};
async function getList() {
  loading.value = true;
  const { data } = await getUserList();
  console.log(data);
  list.value = data;
  loading.value = false;
}
</script>
