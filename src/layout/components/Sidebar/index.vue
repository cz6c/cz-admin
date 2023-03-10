<template>
  <div :class="['sidebar-container', 'has-logo']">
    <Logo :isCollapse="props.isCollapse" />
    <SideMenu :isCollapse="props.isCollapse" />
  </div>
</template>
<script setup lang="ts" name="Sidebar">
import { defineProps } from "vue";
import Logo from "./components/Logo.vue";
import SideMenu from "./components/SideMenu.vue";

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
});
</script>
