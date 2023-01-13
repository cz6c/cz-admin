<template>
  <el-form
    ref="form"
    class="form-view"
    :model="formData"
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
        :placeholder="item.placeholder || `请选择${item.label}`"
      />
      <!-- 下拉选择器 -->
      <el-select
        v-else-if="item.type === 'select'"
        v-model="item.data"
        :placeholder="item.placeholder || `请选择${item.label}`"
      >
        <el-option
          v-for="{ label, value } in item.option"
          :key="value"
          :label="label"
          :value="value"
        />
      </el-select>
      <!-- 输入框 -->
      <el-input
        v-else
        v-model="item.data"
        :placeholder="item.placeholder || `请输入${item.label}`"
      />
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="sumbit">Create</el-button>
  <el-button>Cancel</el-button>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { formJsonItem } from "./type";
const props = defineProps<{
  modelValue: Array<formJsonItem>;
  columns?: number;
  labelWidth?: string | number;
  labelPosition?: "left" | "right" | "top";
}>();
const {
  modelValue,
  columns = 0,
  labelWidth = 120,
  labelPosition = "top",
} = props;
const emit = defineEmits(["sumbit"]);
/**
 * @description: 处理 modelValue 为 对象
 * @return {*}
 */
const formData = computed(() => {
  const temp: Record<string, any> = {};
  modelValue.forEach(({ prop, data }: formJsonItem) => {
    temp[prop] = data;
  });
  return temp;
});
/**
 * @description: 计算formItem宽度
 * @return {*}
 */
const formItemWidth = computed(() => {
  return columns ? `${Math.floor(100 / columns)}%` : `100%`;
});

/**
 * @description: 挂载
 */
onMounted(() => {});

/**
 * @description: 提交表单
 */
const sumbit = () => {
  console.log(formData.value);
  emit("sumbit", formData.value);
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
