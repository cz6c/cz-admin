<template>
  <div :class="['sidebar-container', 'has-logo']">
    <Logo :isCollapse="props.isCollapse" />
    <SideMenu :isCollapse="props.isCollapse" />
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import Logo from "./Logo.vue";
import SideMenu from "./SideMenu.vue";

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
});
</script>
