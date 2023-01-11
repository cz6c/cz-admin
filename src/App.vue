<template>
  <div id="app">
    <FormView :label="label" @on-cilck="a" />
  </div>
</template>

<script setup lang="ts">
import FormView from "./components/FormView.vue";
import { ref } from "vue";
const label = ref("666");
const a = (payload: number) => {
  console.log(payload);
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
