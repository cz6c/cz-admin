<script lang="ts" setup name="Line">
import { ref, Ref, onMounted } from "vue";
import { useEcharts } from "@/hooks/useEcharts";

withDefaults(
  defineProps<{
    width: string;
    height: string;
  }>(),
  {
    width: "100%",
    height: "100%",
  },
);
const chartRef = ref<HTMLDivElement | null>(null);
const { setOptions } = useEcharts(chartRef as Ref<HTMLDivElement>);

onMounted(() => {
  setOptions({
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
      },
    ],
  });
});
</script>

<template>
  <div ref="chartRef" :style="{ height, width }" class="chart-view"></div>
</template>

<style lang="scss" scoped></style>
