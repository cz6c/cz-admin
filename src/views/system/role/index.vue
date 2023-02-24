<script setup lang="ts">
import { ref, reactive } from "vue";
import { getRoleList } from "@/api/system";

const form = reactive({
  name: "",
  code: "",
  status: "",
});
const loading = ref(true);

const formRef = ref();
async function onSearch() {
  loading.value = true;
  const { data } = await getRoleList();
  loading.value = false;
}

const resetForm = formEl => {
  if (!formEl) return;
  formEl.resetFields();
  onSearch();
};
</script>

<template>
  <div class="main">
    <el-form ref="formRef" :inline="true" :model="form" class="bg-bg_color w-[99/100] pl-8 pt-4">
      <el-form-item label="角色名称：" prop="name">
        <el-input v-model="form.name" placeholder="请输入角色名称" clearable class="!w-[200px]" />
      </el-form-item>
      <el-form-item label="角色标识：" prop="code">
        <el-input v-model="form.code" placeholder="请输入角色标识" clearable class="!w-[180px]" />
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-select v-model="form.status" placeholder="请选择状态" clearable class="!w-[180px]">
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
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}
</style>
