<template>
  <div class="upload">
    <UploadImg v-model:imageUrl="url" />
    <UploadImgs v-model:fileList="urls" />
  </div>
</template>

<script setup lang="ts" name="Upload">
import { ref } from "vue";
const url = ref("");
const urls = ref([]);
</script>

<style scoped lang="scss"></style>
