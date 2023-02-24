<script setup lang="ts">
import { ref, reactive } from "vue";
// import { handleTree } from "@/utils/tree";
import { getDeptList } from "@/api/system";
const form = reactive({
  user: "",
  status: "",
});
const loading = ref(true);

const formRef = ref();

function resetForm(formEl) {
  if (!formEl) return;
  formEl.resetFields();
  onSearch();
}

async function onSearch() {
  loading.value = true;
  const { data } = await getDeptList();
  // dataList.value = handleTree(data);
  loading.value = false;
}
</script>

<template>
  <div class="main">
    <el-form ref="formRef" :inline="true" :model="form" class="bg-bg_color w-[99/100] pl-8 pt-4">
      <el-form-item label="部门名称：" prop="user">
        <el-input v-model="form.user" placeholder="请输入部门名称" clearable class="!w-[200px]" />
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-select v-model="form.status" placeholder="请选择状态" clearable class="!w-[180px]">
          <el-option label="开启" value="1" />
          <el-option label="关闭" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSearch"> 搜索 </el-button>
        <el-button @click="resetForm(formRef)"> 重置 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
