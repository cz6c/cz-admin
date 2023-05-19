<template>
  <el-form
    ref="formRef"
    class="form-view"
    :model="formData"
    :rules="rules"
    :label-width="props.labelWidth"
    :label-position="props.labelPosition"
  >
    <el-row>
      <el-col v-for="item in props.modelValue" :key="item.prop" :span="item.span || 8">
        <el-form-item
          class="form-view-item"
          :prop="item.prop"
          :label="item.label"
          :labelWidth="item.itemLabelWidth || props.labelWidth"
          :required="item.required"
        >
          <!-- 日期选择器 -->
          <el-date-picker
            v-if="item.type === 'date'"
            v-model="item.data"
            v-bind="item.elProps"
            value-format="x"
            :placeholder="item.placeholder || `请选择${item.label}`"
            :disabled="item.disabled"
          />
          <!-- 下拉选择器 -->
          <el-select
            v-else-if="item.type === 'select'"
            v-model="item.data"
            :placeholder="item.placeholder || `请选择${item.label}`"
            :disabled="item.disabled"
          >
            <el-option v-for="{ label, value } in item.options" :key="value" :label="label" :value="value" />
          </el-select>
          <!-- 虚拟列表选择器 -->
          <el-select-v2
            v-else-if="item.type === 'selectV2'"
            v-model="item.data"
            :options="item.options"
            :placeholder="item.placeholder || `请选择${item.label}`"
            :disabled="item.disabled"
          />
          <!-- 开关切换 -->
          <el-switch
            v-else-if="item.type === 'switch'"
            v-model="item.data"
            :active-value="1"
            :inactive-value="0"
            :disabled="item.disabled"
          />
          <!-- 多选 -->
          <el-checkbox-group v-else-if="item.type === 'checkbox'" v-model="item.data" :disabled="item.disabled">
            <el-checkbox v-for="{ label, value } in item.options" :key="value" :label="value">{{ label }}</el-checkbox>
          </el-checkbox-group>
          <!-- 单选 -->
          <el-radio-group v-else-if="item.type === 'radio'" v-model="item.data" :disabled="item.disabled">
            <el-radio v-for="{ label, value } in item.options" :key="value" :label="value">{{ label }}</el-radio>
          </el-radio-group>
          <!-- 输入框 -->
          <el-input
            v-else
            v-model="item.data"
            v-bind="item.elProps"
            :placeholder="item.placeholder || `请输入${item.label}`"
            :disabled="item.disabled"
          />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="submitForm(formRef)">保存</el-button>
        <el-button @click="initilaData(formRef)">重置</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts" name="FormView">
import { ref, computed } from "vue";
import { FormJsonItem } from "./index.d";
import { useForm } from "./useForm";
import type { FormInstance, FormRules } from "element-plus";
const formRef = ref<FormInstance>();

interface Props {
  modelValue: Array<FormJsonItem>;
  labelWidth?: string | number;
  labelPosition?: "left" | "right" | "top";
}
const props = withDefaults(defineProps<Props>(), {
  labelWidth: 120,
  labelPosition: "top",
});
const emit = defineEmits(["sumbit"]);

const { formData, formDataMap } = useForm({ rawList: props.modelValue });

/**
 * @description: 处理表单验证
 * @return {*}
 */
const rules = computed(() => {
  const temp: FormRules = {};
  props.modelValue.forEach(({ type = "input", label, required, rule = [], prop }) => {
    const blurArr = ["input"];
    const trigger = blurArr.includes(type) ? "blur" : "change";
    const message = blurArr.includes(type) ? `请输入${label}` : `请选择${label}`;
    const arr = required ? [{ required: true, message, trigger }] : [];
    const ruleList = [...arr, ...rule];
    temp[prop] = ruleList;
  });
  return temp;
});

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

defineExpose({
  submitForm,
  initilaData,
});
</script>

<style scoped lang="scss">
.form-view {
  &-item {
    box-sizing: border-box;

    :deep(.el-form-item__content) {
      > div {
        width: 300px;
      }

      .el-switch {
        width: auto;
      }
    }
  }
}
</style>
