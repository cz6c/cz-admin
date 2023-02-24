<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in matched" :key="item.path">
      <a @click.prevent="handleLink(item)">
        {{ item.meta.name }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter, RouteLocationMatched } from "vue-router";

const route = useRoute();
const router = useRouter();
// console.log(route.matched);

const matched = computed(() => {
  return route.matched;
});

const handleLink = (item: RouteLocationMatched): void => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect as any);
  } else {
    router.push(path);
  }
};
</script>
