<script setup lang="ts" name="Gsap">
import { gsap } from "gsap";
import { getCurrentInstance } from "vue";

const that = getCurrentInstance();
const posiList = ref([
  // 左
  {
    x: 175,
    y: 200,
  },
  {
    x: 175,
    y: 310,
  },
  {
    x: 175,
    y: 420,
  },
  {
    x: 175,
    y: 530,
  },
  {
    x: 175,
    y: 640,
  },
  {
    x: 175,
    y: 750,
  },
  // 上
  {
    x: 200,
    y: 175,
  },
  {
    x: 310,
    y: 175,
  },
  {
    x: 420,
    y: 175,
  },
  {
    x: 530,
    y: 175,
  },
  {
    x: 640,
    y: 175,
  },
  {
    x: 750,
    y: 175,
  },
  // 右
  {
    x: 800,
    y: 280,
  },
  {
    x: 800,
    y: 390,
  },
  {
    x: 800,
    y: 500,
  },
  {
    x: 800,
    y: 610,
  },
  {
    x: 800,
    y: 720,
  },
  {
    x: 800,
    y: 830,
  },
  //下
  {
    x: 840,
    y: 840,
  },
  {
    x: 730,
    y: 840,
  },
  {
    x: 620,
    y: 840,
  },
  {
    x: 510,
    y: 840,
  },
  {
    x: 400,
    y: 840,
  },
  {
    x: 290,
    y: 840,
  },
]);
const data = ref({
  x: 0,
  y: 0,
  ref: "",
});
const newIndex = ref(-1);
function handleClick(index: number) {
  newIndex.value = index;
  if (data.value.ref) {
    const el = (that!.refs[`${data.value.ref}`] as any)[0];
    gsap.to(`.${data.value.ref}`, {
      x: data.value.x - el.offsetLeft,
      y: data.value.y - el.offsetTop,
      scale: 1,
      direction: 2,
    });
  }
  const el = (that!.refs[`item${index}`] as any)[0];
  data.value.ref = `item${index}`;
  data.value.x = el.offsetLeft;
  data.value.y = el.offsetTop;
  gsap.to(`.item${index}`, {
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
        :class="`item${i} ${newIndex === i ? 'enlarged' : ''}`"
        :style="{ top: `${y}px`, left: `${x}px` }"
        :ref="`item${i}`"
        v-for="({ x, y }, i) in posiList"
        :key="i"
        @click="handleClick(i)"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box-list {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  .box {
    width: 100px;
    height: 100px;
    background-color: #333;
    margin: 10px;
    transition: flex-grow 0.5s, width 0.5s, height 0.5s;
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    overflow: hidden;
    transition: width 0.5s, height 0.5s;
  }
  .enlarged {
    flex-grow: 5;
    width: 300px;
    height: 300px;
  }
}
</style>
