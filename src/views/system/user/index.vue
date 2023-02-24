<script setup lang="ts">
import { ref, reactive } from "vue";
import tree from "./tree.vue";
import { getUserList } from "@/api/system/index";

const formRef = ref();
const form = reactive({
  username: "",
  mobile: "",
  status: "",
});
const loading = ref(true);

const resetForm = formEl => {
  if (!formEl) return;
  formEl.resetFields();
  onSearch();
};
async function onSearch() {
  loading.value = true;
  const { data } = await getUserList();
  loading.value = false;
}
</script>

<template>
  <div class="main">
    <tree class="w-[17%] float-left" />
    <div class="float-right w-[81%]">
      <el-form ref="formRef" :inline="true" :model="form" class="bg-bg_color w-[99/100] pl-8 pt-4">
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
          <el-button type="primary" :loading="loading" @click="onSearch"> 搜索 </el-button>
          <el-button @click="resetForm(formRef)"> 重置 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}
</style>
