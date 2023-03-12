<template>
  <span class="extra-fold" @click="handleFold">
    <SvgIcon :name="getIcon" />
  </span>
</template>
<script lang="ts" setup name="FoldButton">
import { unref, computed } from "vue";
import { useLayoutStore } from "@/store/modules/layout";

const layoutStore = useLayoutStore();

const getIsFold = computed(() => unref(layoutStore.getShowSidebar) && unref(layoutStore.getShowNavbar));

const getIcon = computed(() => (unref(getIsFold) ? "full_screen" : "exit_screen"));

function handleFold() {
  const isFold = unref(getIsFold);
  layoutStore.setShowSidebar(!isFold);
  layoutStore.setShowNavbar(!isFold);
}
</script>
