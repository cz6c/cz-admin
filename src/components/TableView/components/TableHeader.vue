<script setup lang="ts" name="TableHeader">
import { CheckboxValueType } from "element-plus";
import { TableCol } from "../type";
import { useSortable } from "/@/hooks/useSortable";
import { isNullAndUnDef } from "/@/utils/is";
import { cloneDeep } from "lodash-es";

const props = defineProps<{
  title: String;
  columns: TableCol[];
}>();
const emits = defineEmits(["updateList", "columns-change"]);

const plainSortOptions = ref<TableCol[]>([]);
const checkedList = ref<string[]>([]);
plainSortOptions.value = cloneDeep(props.columns);
checkedList.value = props.columns.map(c => c.prop!);

nextTick(() => {
  const el = document.querySelectorAll(`.el-checkbox-group`)?.[0] as HTMLElement;
  const { initSortable } = useSortable(el, {
    onEnd: evt => {
      const { oldIndex, newIndex } = evt;

      if (isNullAndUnDef(oldIndex) || isNullAndUnDef(newIndex) || oldIndex === newIndex) {
        return;
      }

      // Sort column
      const columns = cloneDeep(plainSortOptions.value);

      if (oldIndex > newIndex) {
        columns.splice(newIndex, 0, columns[oldIndex]);
        columns.splice(oldIndex + 1, 1);
      } else {
        columns.splice(newIndex + 1, 0, columns[oldIndex]);
        columns.splice(oldIndex, 1);
      }

      plainSortOptions.value = columns;
      console.log(plainSortOptions.value);
      setColumns(columns.filter(item => checkedList.value.includes(item.prop!)));
    },
  });
  initSortable();
});
function setColumns(columns: TableCol[] | string[]) {
  console.log(columns);
  // table.setColumns(columns);
  const data: any[] = unref(plainSortOptions).map(col => {
    const visible =
      columns.findIndex((c: TableCol | string) => c === col.prop || (typeof c !== "string" && c.prop === col.prop)) !==
      -1;
    return { ...col, dataIndex: col.prop, visible };
  });
  console.log(data);
  emits("columns-change", data);
}
/**
 * @description: 选择改变时，重新排序后更新columns
 * @param {*} checkedList
 */
function onChange(checkedList: CheckboxValueType[]) {
  const arr = checkedList as string[];
  console.log(arr);
  const sortList = unref(plainSortOptions).map(item => item.prop);
  arr.sort((prev, next) => {
    return sortList.indexOf(prev) - sortList.indexOf(next);
  });
  setColumns(arr);
}
</script>

<template>
  <div class="table-header">
    <div class="header-title">{{ props.title }}</div>
    <div class="header-operate">
      <slot name="tools"> </slot>
      <div class="icons">
        <span class="icon-wrap" @click="emits('updateList')">
          <el-icon><Refresh /></el-icon>
        </span>
        <el-dropdown trigger="click" :hide-on-click="false">
          <span class="icon-wrap">
            <el-icon><Setting /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-checkbox-group v-model="checkedList" @change="onChange">
                <el-dropdown-item v-for="item in props.columns" :key="item.prop">
                  <el-checkbox :label="item.prop">{{ item.label }}</el-checkbox>
                </el-dropdown-item>
              </el-checkbox-group>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  height: 50px;

  .header-title {
    font-size: 18px;
    font-weight: 600;
  }

  .header-operate {
    display: flex;
    align-items: center;
    height: 100%;

    .icons {
      display: flex;
      padding-left: 8px;

      .icon-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
}
</style>
