<script setup lang="ts" name="Control">
import { ref, unref } from "vue";
import type { LogicFlow } from "@logicflow/core";

interface Props {
  lf: LogicFlow | null;
}

const props = withDefaults(defineProps<Props>(), {
  lf: null,
});

const emit = defineEmits<{
  (e: "cat-data"): void;
}>();

const focusIndex = ref<Number>(-1);
const controls = ref([
  {
    icon: "ZoomOut",
    text: "缩小",
    disabled: false,
  },
  {
    icon: "ZoomIn",
    text: "放大",
    disabled: false,
  },
  {
    icon: "FullScreen",
    text: "适应",
    disabled: false,
  },
  {
    icon: "Back",
    text: "上一步",
    disabled: true,
  },
  {
    icon: "Right",
    text: "下一步",
    disabled: true,
  },
  {
    icon: "Picture",
    text: "下载图片",
    disabled: false,
  },
  {
    icon: "CopyDocument",
    text: "查看数据",
    disabled: false,
  },
]);
/**
 * @description: 控制功能
 * @param {*} text
 */
function handleControl(text: string) {
  switch (text) {
    case "缩小":
      props.lf?.zoom();
      break;
    case "放大":
      props.lf?.zoom(true);
      break;
    case "重置比例":
      props.lf?.resetZoom();
      break;
    case "上一步":
      props.lf?.undo();
      break;
    case "下一步":
      props.lf?.redo();
      break;
    case "下载图片":
      props.lf?.getSnapshot();
      break;
    case "查看数据":
      emit("cat-data");
      break;
  }
}

function onHistoryChange({ data: { undoAble, redoAble } }: { data: { undoAble: boolean; redoAble: boolean } }) {
  unref(controls)[3].disabled = !undoAble;
  unref(controls)[4].disabled = !redoAble;
}

watchEffect(async () => {
  if (props.lf) {
    await nextTick();
    props.lf.on("history:change", onHistoryChange);
  }
});

onUnmounted(() => {
  if (props.lf) {
    props.lf.off("history:change", onHistoryChange);
  }
});
</script>

<template>
  <div class="control-container">
    <div
      v-for="(item, key) in controls"
      :key="key"
      class="item"
      @mouseenter.prevent="focusIndex = key"
      @mouseleave.prevent="focusIndex = -1"
    >
      <el-tooltip :content="item.text" :visible="focusIndex === key" placement="right">
        <el-button
          :disabled="item.disabled"
          :style="{
            cursor: item.disabled ? 'not-allowed' : 'pointer',
          }"
          @click="handleControl(item.text)"
        >
          <el-icon :size="18"><component :is="item.icon" /></el-icon>
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.control-container {
  .item {
    height: 36px;
  }
}
</style>
