<script setup lang="ts" name="GraphDataDialog">
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  graphData: Object,
});
const emits = defineEmits(["update:modelValue"]);

const dialogVisible = computed({
  get: () => props.modelValue,
  set: value => {
    emits("update:modelValue", value);
  },
});
</script>

<template>
  <el-dialog v-model="dialogVisible" title="查看数据">
    <el-scrollbar>
      <vue-json-pretty :path="'res'" :deep="3" :showLength="true" :data="props.graphData" />
    </el-scrollbar>
  </el-dialog>
</template>

<style lang="scss" scoped>
:deep(.vjs-tree) {
  height: 600px;
}
</style>
