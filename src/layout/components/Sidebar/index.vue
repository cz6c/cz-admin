<template>
  <div :class="['sidebar-container', 'has-logo']">
    <Logo />
    <SideMenu />
  </div>
</template>
<script setup lang="ts" name="Sidebar">
import Logo from "./components/Logo.vue";
import SideMenu from "./components/SideMenu.vue";
</script>
