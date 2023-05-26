<template>
  <component
    :is="column?.render ?? `el-${column?.type}`"
    v-bind="{ ...handleSearchProps, ...placeholder, searchParam, clearable }"
    v-model.trim="searchParam[handleProp(column.prop!)]"
    :data="column.type === 'tree-select' ? columnEnum : []"
    :options="['cascader', 'select-v2'].includes(column.type!) ? columnEnum : []"
  >
    <template #default="{ data }" v-if="column?.type === 'cascader'">
      <span>{{ data[fieldNames.label] }}</span>
    </template>
    <template v-if="column?.type === 'select'">
      <component
        :is="`el-option`"
        v-for="(col, index) in columnEnum"
        :key="index"
        :label="col[fieldNames.label]"
        :value="col[fieldNames.value]"
      />
    </template>
    <slot v-else></slot>
  </component>
</template>

<script setup lang="ts" name="SearchFormItem">
import { computed, inject, ref } from "vue";
import { handleProp } from "@/utils";
import { FormJsonItem } from "../index.d";

interface SearchFormItem {
  column: FormJsonItem;
  searchParam: { [key: string]: any };
}
const props = defineProps<SearchFormItem>();

// 判断 fieldNames 设置 label && value && children 的 key 值
const fieldNames = computed(() => {
  return {
    label: "label",
    value: "value",
    children: "children",
  };
});

// 接收 enumMap (el 为 select-v2 需单独处理 enumData)
const enumMap = inject("enumMap", ref(new Map()));
const columnEnum = computed(() => {
  let enumData = enumMap.value.get(props.column.prop);
  if (!enumData) return [];
  if (props.column?.type === "select-v2") {
    enumData = enumData.map((item: { [key: string]: any }) => {
      return { ...item, label: item[fieldNames.value.label], value: item[fieldNames.value.value] };
    });
  }
  return enumData;
});

// 处理透传的 searchProps (el 为 tree-select、cascader 的时候需要给下默认 label && value && children)
const handleSearchProps = computed(() => {
  const label = fieldNames.value.label;
  const value = fieldNames.value.value;
  const children = fieldNames.value.children;
  const searchEl = props.column?.type;
  let searchProps = props.column?.elProps ?? {};
  if (searchEl === "tree-select") {
    searchProps = { ...searchProps, props: { ...searchProps.props, label, children }, nodeKey: value };
  }
  if (searchEl === "cascader") {
    searchProps = { ...searchProps, props: { ...searchProps.props, label, value, children } };
  }
  return searchProps;
});

// 处理默认 placeholder
const placeholder = computed(() => {
  const search = props.column;
  if (["datetimerange", "daterange", "monthrange"].includes(search?.elProps?.type) || search?.elProps?.isRange) {
    return { rangeSeparator: "至", startPlaceholder: "开始时间", endPlaceholder: "结束时间" };
  }
  const placeholder = search?.elProps?.placeholder ?? (search?.type?.includes("input") ? "请输入" : "请选择");
  return { placeholder };
});

// 是否有清除按钮 (当搜索项有默认值时，清除按钮不显示)
const clearable = computed(() => {
  const search = props.column;
  return search?.elProps?.clearable ?? (search?.initilaData == null || search?.initilaData == undefined);
});
</script>
