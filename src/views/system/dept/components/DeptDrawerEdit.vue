<template>
  <el-drawer v-model="dialog" title="新增部门" direction="ltr" class="cz-drawer" size="36%" @open="handleOpen">
    <div class="demo-drawer__content">
      <el-form :model="form" status-icon ref="ruleFormRef" :rules="rules" label-width="120px">
        <el-form-item label="deptName" prop="deptName">
          <el-input v-model="form.deptName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="remark" prop="remark">
          <el-input v-model="form.remark" autocomplete="off" />
        </el-form-item>
        <el-form-item label="status" prop="status">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
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

<script lang="ts" setup name="DeptDrawerEdit">
import { reactive, ref, computed, unref } from "vue";
import { FormInstance, FormRules } from "element-plus";
import { useFrom } from "@/hooks/useFrom";

const props = defineProps({
  modelValue: {
    type: Boolean,
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
const form = reactive({
  deptName: "",
  remark: "",
  status: 0,
});
const rules = reactive<FormRules>({
  deptName: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  remark: [{ required: true, message: "Please input activity form", trigger: "blur" }],
  status: [
    {
      required: true,
      message: "Please select Activity count",
      trigger: "change",
    },
  ],
});
const handleSubmit = () => {
  loading.value = true;
  console.log(form);
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
