<template>
  <el-drawer v-model="dialog" title="新增用户" direction="ltr" class="cz-drawer" size="36%" @open="handleOpen">
    <div class="demo-drawer__content">
      <el-form :model="formData" status-icon ref="ruleFormRef" :rules="rules" label-width="120px">
        <el-form-item label="username" prop="username">
          <el-input v-model="formData.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="remark" prop="remark">
          <el-input v-model="formData.remark" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button @click="dialog = false">Cancel</el-button>
        <el-button type="primary" :loading="loading" @click="submitForm(ruleFormRef)">{{
          loading ? "Submitting ..." : "Submit"
        }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup name="UserDrawerEdit">
import { reactive, ref, computed, unref } from "vue";
import { FormInstance, FormRules } from "element-plus";
import { useFrom } from "/@/hooks/useFrom";
import { saveUserApi, updateUserApi } from "/@/api/system/user";
import { UserInfo } from "/@/api/system/user/index.d";

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  id: {
    type: Number,
  },
});
const emits = defineEmits(["update:modelValue"]);

const dialog = computed({
  get: () => props.modelValue,
  set: value => {
    emits("update:modelValue", value);
  },
});

const loading = ref(false);

const ruleFormRef = ref<FormInstance>();
const formData = reactive({
  username: "",
  remark: "",
  roleId: "",
  deptId: "",
  avatar: "",
});
const rules = reactive<FormRules>({
  username: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  avatar: [{ required: true, message: "Please input activity form", trigger: "blur" }],
});
const handleSubmit = async () => {
  loading.value = true;
  console.log(formData);
  const json: UserInfo = {
    ...formData,
  };
  let api = saveUserApi;
  if (props.id) {
    json.id = props.id;
    api = updateUserApi;
  }
  try {
    await api(json);
  } catch (error) {}
  setTimeout(() => {
    loading.value = false;
    dialog.value = false;
  }, 600);
};
const { resetForm, submitForm } = useFrom(handleSubmit);

const handleOpen = () => {
  resetForm(unref(ruleFormRef));
};
</script>

<style scoped lang="scss"></style>
