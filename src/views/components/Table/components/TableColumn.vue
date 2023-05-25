<template>
  <RenderTableColumn v-bind="column" />
</template>

<script setup lang="tsx" name="TableColumn">
import { useSlots } from "vue";
import Table from "../index.d";
import { formatValue, handleProp, handleRowAccordingToProp } from "@/utils";

defineProps<{ column: Table.TableCol }>();

const slots = useSlots();

// 渲染表格数据
const renderCellData = (item: Table.TableCol, scope: Table.RenderScope<any>) => {
  return formatValue(handleRowAccordingToProp(scope.row, item.prop!));
};

const RenderTableColumn = (item: Table.TableCol) => {
  return (
    <>
      {
        <el-table-column
          {...item}
          align={item.align ?? "center"}
          showOverflowTooltip={item.showOverflowTooltip ?? item.prop !== "operation"}
        >
          {{
            default: (scope: Table.RenderScope<any>) => {
              if (item.render) return item.render(scope);
              if (slots[handleProp(item.prop!)]) return slots[handleProp(item.prop!)]!(scope);
              return renderCellData(item, scope);
            },
            header: (scope: Table.HeaderRenderScope<any>) => {
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
