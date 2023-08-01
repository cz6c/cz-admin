<script setup lang="ts" name="FlowChartPage">
import graphData from "./data.json";
</script>

<template>
  <div class="page">
    <FlowChart class="cz-card" :data="graphData" />
  </div>
</template>

<style scoped lang="scss"></style>
