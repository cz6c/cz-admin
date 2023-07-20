<template>
  <div class="page cz-card">
    <WangEditor v-model="value" />
  </div>
</template>

<script setup lang="ts" name="WangEditorPage">
const value = ref("123");
</script>

<style lang="scss" scoped>
.page {
  padding: 30px;
  height: 100%;
  box-sizing: border-box;
}
</style>
