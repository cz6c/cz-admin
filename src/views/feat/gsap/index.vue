<script setup lang="ts" name="Gsap">
import { gsap } from "gsap";
import { onMounted, getCurrentInstance } from "vue";

onMounted(() => {});
const that = getCurrentInstance();
const data = ref({
  x: 0,
  y: 0,
  ref: "",
});
function handleClick(item: number) {
  if (data.value.ref) {
    const el = (that!.refs[`${data.value.ref}`] as any)[0];
    gsap.to(`.${data.value.ref}`, {
      x: data.value.x - el.offsetLeft,
      y: data.value.y - el.offsetTop,
      scale: 1,
      direction: 2,
    });
  }
  const el = (that!.refs[`item${item}`] as any)[0];
  data.value.ref = `item${item}`;
  data.value.x = el.offsetLeft;
  data.value.y = el.offsetTop;
  gsap.to(`.item${item}`, {
    x: 500 - data.value.x,
    y: 500 - data.value.y,
    scale: 1.5,
    direction: 2,
  });
}
</script>

<template>
  <div class="page">
    <div class="box-list">
      <div
        class="box"
        :class="`item${item}`"
        :ref="`item${item}`"
        v-for="item in 30"
        :key="item"
        @click="handleClick(item)"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box-list {
  position: relative;
  .box {
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: #333;
    margin: 10px;
    &:nth-child(1) {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
