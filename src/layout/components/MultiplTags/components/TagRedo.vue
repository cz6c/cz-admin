<template>
  <span v-loading="loading" class="extra-redo" @click="handleRedo">
    <el-icon><RefreshRight /></el-icon>
  </span>
</template>
<script lang="ts" setup name="TagRedo">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMultiTagsStore } from "@/store/modules/multiTags";

const loading = ref(false);
const router = useRouter();
const { refreshPage } = useMultiTagsStore();

async function handleRedo() {
  loading.value = true;
  await refreshPage(router);
  setTimeout(() => {
    loading.value = false;
  }, 800);
}
</script>
