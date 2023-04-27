<template>
  <div class="extra-redo" @click="handleRedo">
    <SvgIcon ref="redo" name="redo" />
    <!-- <el-icon ref="redo" :size="20"><RefreshRight /></el-icon> -->
  </div>
</template>
<script lang="ts" setup name="TagRedo">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMultiTagsStore } from "@/store/modules/multiTags";
import { useAnimate } from "@vueuse/core";

const redo = ref();
const { play, finish } = useAnimate(redo, { transform: "rotate(360deg)" }, 1000);

const router = useRouter();
const { refreshPage } = useMultiTagsStore();

async function handleRedo() {
  play();
  await refreshPage(router);
  setTimeout(() => {
    finish();
  }, 800);
}
</script>
