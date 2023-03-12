<template>
  <router-view class="router-view">
    <template #default="{ Component, route }">
      <transition name="fade-slide" mode="out-in" appear>
        <keep-alive v-if="isShowTags" :include="multiTagsStore.getcachedPages">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component :is="Component" v-else :key="route.fullPath" />
      </transition>
    </template>
  </router-view>
</template>

<script setup lang="ts" name="AppMain">
import { useMultiTagsStore } from "@/store/modules/multiTags";
import { isShowTags } from "@/config";
const multiTagsStore = useMultiTagsStore();
</script>

<style>
.router-view {
  min-height: 100%;
}
</style>
