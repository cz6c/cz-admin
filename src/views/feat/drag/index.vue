<script setup lang="ts" name="Drag">
import { ref, onMounted, unref } from "vue";
import { useDrag } from "./useDrag";

const dragRef = ref<HTMLDivElement | null>(null);
const wrapRef = ref<HTMLDivElement | null>(null);

function onMove(left: number, top: number) {
  // 如果传入了外部元素，说明需要限制元素拖拽范围
  // left 控制在 0 到 wrapEl.offsetWidth - el.offsetWidth 之间
  // top 控制在 0 到 wrapEl.offsetHeight - el.offsetHeight 之间
  const wrapEl = unref(wrapRef);
  const dragEl = unref(dragRef);
  if (!dragEl || !wrapEl) return;
  if (left < 0) {
    dragEl.style.left = `0px`;
  } else if (left > wrapEl.offsetWidth - dragEl.offsetWidth) {
    dragEl.style.left = `${wrapEl.offsetWidth - dragEl.offsetWidth}px`;
  } else {
    dragEl.style.left = `${left}px`;
  }
  if (top < 0) {
    dragEl.style.top = `0px`;
  } else if (top > wrapEl.offsetHeight - dragEl.offsetHeight) {
    dragEl.style.top = `${wrapEl.offsetHeight - dragEl.offsetHeight}px`;
  } else {
    dragEl.style.top = `${top}px`;
  }
}

onMounted(() => {
  useDrag({ dragElRef: dragRef, onMove });
});
</script>

<template>
  <div class="drag-wrap" ref="wrapRef">
    <div id="box" draggable="true" ref="dragRef">
      <div id="bar">拖拽</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.drag-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #e6e6e6;
}

#box {
  width: 100px;
  height: 100px;
  font-size: 12px;
  background: #f0f3f9;
}
</style>
