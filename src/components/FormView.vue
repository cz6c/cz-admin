<template>
  <el-form
    ref="formRef"
    class="form-view"
    :model="formData"
    :rules="rules"
    :label-width="labelWidth"
    :label-position="labelPosition"
  >
    <el-form-item
      class="form-view-item"
      v-for="item in modelValue"
      :key="item.prop"
      :label="item.label"
      :labelWidth="item.itemLabelWidth || labelWidth"
      :required="item.required"
      :style="{ width: item.itemContentWidth || formItemWidth }"
    >
      <!-- 时间选择器 -->
      <el-time-picker
        v-if="item.type === 'date'"
        v-model="item.data"
        v-bind="item.elProps"
        :placeholder="item.placeholder || `请选择${item.label}`"
      />
      <!-- 下拉选择器 -->
      <el-select
        v-else-if="item.type === 'select'"
        v-model="item.data"
        :placeholder="item.placeholder || `请选择${item.label}`"
      >
        <el-option v-for="{ label, value } in item.option" :key="value" :label="label" :value="value" />
      </el-select>
      <!-- 输入框 -->
      <el-input v-else v-model="item.data" :placeholder="item.placeholder || `请输入${item.label}`" />
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="submitForm(formRef)">保存</el-button>
  <el-button @click="initilaData(formRef)">重置</el-button>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { formJsonItem } from "../utils/public";
import formFormat from "../hooks/formFormat";
import type { FormInstance, FormRules } from "element-plus";
const formRef = ref<FormInstance>();
const props = defineProps<{
  modelValue: Array<formJsonItem>;
  columns?: number;
  labelWidth?: string | number;
  labelPosition?: "left" | "right" | "top";
}>();
const { modelValue, columns = 0, labelWidth = 120, labelPosition = "top" } = props;
const emit = defineEmits(["sumbit"]);

const { formData, formDataMap } = formFormat({ rawList: modelValue });

/**
 * @description: 计算formItem宽度
 * @return {*}
 */
const formItemWidth = computed(() => {
  return columns ? `${Math.floor(100 / columns)}%` : `100%`;
});

/**
 * @description: 处理表单验证
 * @return {*}
 */
const rules = computed(() => {
  const temp: FormRules = {};
  modelValue.forEach(({ type = "input", label, required, rule = [], prop }) => {
    const blurArr = ["input"];
    const trigger = blurArr.includes(type) ? "blur" : "change";
    const message = blurArr.includes(type) ? `请输入${label}` : `请选择${label}`;
    const arr = required ? [{ required: true, message, trigger }] : [];
    const ruleList = [...arr, ...rule];
    temp[prop] = ruleList;
  });
  return temp;
});
console.log(rules.value);

/**
 * @description: 提交表单
 */
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      console.log("submit!");
      emit("sumbit", formData.value);
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

/**
 * @description: 初始化表单数据
 */
const initilaData = (formEl: FormInstance | undefined) => {
  Object.entries(formDataMap.value).forEach(([prop, item]) => {
    formDataMap.value[prop].data = item.initilaData;
  });
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped lang="scss">
.form-view {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  &-item {
    padding-right: 6%;
    :deep(.el-form-item__content) {
      > div {
        width: 100%;
      }
    }
  }
}
</style>
