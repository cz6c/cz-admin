<template>
  <router-view>
    <template #default="{ Component, route }">
      <Transition name="fade-transform" mode="out-in" appear>
        <component :is="Component" :key="route.fullPath" />
      </Transition>
    </template>
  </router-view>
</template>

<script setup lang="ts" name="AppMain"></script>
