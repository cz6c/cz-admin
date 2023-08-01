<script setup lang="ts" name="FlowChart">
import { ref, onMounted } from "vue";
import LogicFlow from "@logicflow/core";
import { DndPanel, SelectionSelect, Menu, BpmnElement, Snapshot } from "@logicflow/extension";
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";

import { configDefaultDndPanel } from "./config";
import Control from "./components/Control.vue";
import GraphDataDialog from "./components/GraphDataDialog.vue";

interface Props {
  data: Object;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => {},
});

const lfElRef = ref<HTMLElement>();
const lf = ref<LogicFlow>();
const isDialog = ref<Boolean>(false);
const graphData = ref<Object>({});

onMounted(() => {
  lf.value = new LogicFlow({
    container: lfElRef.value!,
    grid: true,
    plugins: [DndPanel, SelectionSelect, Menu, BpmnElement, Snapshot],
  });
  // 设置节点面板
  const patternItems = configDefaultDndPanel();
  lf.value.extension.dndPanel.setPatternItems(patternItems);
  // 开启框选插件
  lf.value.extension.selectionSelect.openSelectionSelect();
  // 渲染数据
  lf.value.render(props.data);
});

function catData() {
  graphData.value = lf.value.getGraphData();
  isDialog.value = true;
}
</script>

<template>
  <div class="lf-container">
    <div ref="lfElRef" class="container"></div>
    <Control class="control cz-card" :lf="lf" @cat-data="catData" />
    <GraphDataDialog :graphData="graphData" v-model="isDialog" />
  </div>
</template>

<style scoped lang="scss">
.lf-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  .container {
    width: 100%;
    height: 100%;
  }

  .control {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}
</style>
