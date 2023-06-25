<!-- eslint-disable vue/no-mutating-props -->
<template>
  <component
    :is="`el-${column?.el}`"
    v-bind="{ ...(column?.props || {}), ...placeholder, clearable }"
    v-model="searchParam[handleProp(column.prop)]"
    :data="column?.el === 'tree-select' ? column.options : []"
    :options="['cascader', 'select-v2'].includes(column?.el!) ? column.options : []"
  >
    <template v-if="column?.el === 'select'">
      <component
        :is="`el-option`"
        v-for="(col, index) in column.options"
        :key="index"
        :label="col['label']"
        :value="col['value']"
      />
    </template>
  </component>
</template>

<script setup lang="ts" name="SearchFormItem">
import { computed } from "vue";
import { handleProp } from "/@/utils";
import { SearchProps } from "../type";

interface Props {
  column: SearchProps;
  searchParam: { [key: string]: any };
}
const props = defineProps<Props>();

// 处理默认 placeholder
const placeholder = computed(() => {
  const search = props.column;
  if (["datetimerange", "daterange", "monthrange"].includes(search?.props?.type) || search?.props?.isRange) {
    return { rangeSeparator: "至", startPlaceholder: "开始时间", endPlaceholder: "结束时间" };
  }
  const placeholder = search?.props?.placeholder ?? (search?.el?.includes("input") ? "请输入" : "请选择");
  return { placeholder };
});

// 是否有清除按钮 (当搜索项有默认值时，清除按钮不显示)
const clearable = computed(() => {
  const search = props.column;
  return search?.props?.clearable ?? (search?.defaultValue == null || search?.defaultValue == undefined);
});
</script>
