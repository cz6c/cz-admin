<template>
  <RenderTableColumn v-bind="column" />
</template>

<script setup lang="tsx" name="TableColumn">
import { useSlots } from "vue";
import { TableCol, RenderScope, HeaderRenderScope } from "../type";
import { formatValue, handleProp, handleRowAccordingToProp } from "/@/utils";

defineProps<{ column: TableCol }>();

const slots = useSlots();

// 渲染表格数据
const renderCellData = (item: TableCol, scope: RenderScope<any>) => {
  return formatValue(handleRowAccordingToProp(scope.row, item.prop!));
};

const RenderTableColumn = (item: TableCol) => {
  return (
    <>
      {
        <el-table-column
          {...item}
          align={item.align ?? "center"}
          showOverflowTooltip={item.showOverflowTooltip ?? item.prop !== "operation"}
        >
          {{
            default: (scope: RenderScope<any>) => {
              if (item.render) return item.render(scope);
              if (slots[handleProp(item.prop!)]) return slots[handleProp(item.prop!)]!(scope);
              return renderCellData(item, scope);
            },
            header: (scope: HeaderRenderScope<any>) => {
              if (item.headerRender) return item.headerRender(scope);
              if (slots[`${handleProp(item.prop!)}Header`]) return slots[`${handleProp(item.prop!)}Header`]!(scope);
              return item.label;
            },
          }}
        </el-table-column>
      }
    </>
  );
};
</script>
