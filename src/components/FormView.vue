<template>
  <div class="form-view"></div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
const prop = defineProps<{
  label?: string;
}>();
const emit = defineEmits(["on-cilck", "on-cilck2"]);
emit("on-cilck", 123);
console.log(prop.label);
</script>

<style scoped lang="scss"></style>
