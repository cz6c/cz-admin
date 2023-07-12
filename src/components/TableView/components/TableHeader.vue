<script setup lang="ts" name="TableHeader">
import { CheckboxValueType } from "element-plus/es/components/checkbox";
import { TableCol } from "../type";
import { useSortable } from "/@/hooks/useSortable";
import { isNullAndUnDef } from "/@/utils/is";
import { cloneDeep } from "lodash-es";
import SvgIcon from "../../SvgIcon.vue";

const props = defineProps<{
  title: String;
  columns: TableCol[];
}>();
const emits = defineEmits(["update-list", "update-columns"]);

const plainSortOptions = ref<TableCol[]>([]);
const checkedList = ref<string[]>([]);
const checkAll = ref(false);
const isIndeterminate = ref(true);
const isSelectionCol = ref(false);
const isIndexCol = ref(true);

/**
 * @description: 初始化/重置
 */
function init() {
  plainSortOptions.value = props.columns.map(c => {
    return { ...c, fixed: false };
  });
  handleCheckAllChange(true);
  isSelectionCol.value = false;
  isIndexCol.value = true;
}
onMounted(() => {
  init();
});

/**
 * @description: 全选
 * @param {*} val
 */
function handleCheckAllChange(val: CheckboxValueType) {
  checkedList.value = val ? unref(plainSortOptions).map(c => c.prop!) : [];
  handleCheckedChange(checkedList.value);
}
/**
 * @description: 单选
 * @param {*} checkedList
 */
function handleCheckedChange(checkedList: CheckboxValueType[]) {
  // 判断是否全选
  const checkedCount = checkedList.length;
  checkAll.value = checkedCount === unref(plainSortOptions).map(c => c.prop!).length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < unref(plainSortOptions).map(c => c.prop!).length;
  // 重新排序
  const arr = checkedList as string[];
  const sortList = unref(plainSortOptions).map(item => item.prop);
  arr.sort((prev, next) => {
    return sortList.indexOf(prev) - sortList.indexOf(next);
  });
  setColumns(arr);
}
/**
 * @description: 拖拽排序
 */
nextTick(() => {
  const el = document.querySelectorAll(`.el-checkbox-group`)?.[0] as HTMLElement;
  const { initSortable } = useSortable(el, {
    onEnd: evt => {
      const { oldIndex, newIndex } = evt;
      if (isNullAndUnDef(oldIndex) || isNullAndUnDef(newIndex) || oldIndex === newIndex) {
        return;
      }
      // 排序改变
      const columns = cloneDeep(plainSortOptions.value);
      if (oldIndex > newIndex) {
        columns.splice(newIndex, 0, columns[oldIndex]);
        columns.splice(oldIndex + 1, 1);
      } else {
        columns.splice(newIndex + 1, 0, columns[oldIndex]);
        columns.splice(oldIndex, 1);
      }
      plainSortOptions.value = columns;
      setColumns(columns.filter(item => checkedList.value.includes(item.prop!)));
    },
  });
  initSortable();
});
function handleItemfixed(key: string, type: string) {
  const item = unref(plainSortOptions).find(c => c.prop === key);
  if (!item) return;
  item.fixed = type;
  console.log(item);
  console.log(unref(plainSortOptions));
  setColumns(unref(plainSortOptions));
}
/**
 * @description: 更新columns
 * @param {*} columns
 */
function setColumns(columns: TableCol[] | string[]) {
  const data: TableCol[] = unref(plainSortOptions).map(col => {
    const visible =
      columns.findIndex((c: TableCol | string) => c === col.prop || (typeof c !== "string" && c.prop === col.prop)) !==
      -1;
    return { ...col, visible };
  });
  emits("update-columns", data);
}

// 暴露给父组件参数和方法
defineExpose({ isSelectionCol, isIndexCol });
</script>

<template>
  <div class="table-header">
    <div class="header-title">{{ props.title }}</div>
    <div class="header-operate">
      <slot name="tools"> </slot>
      <div class="icons">
        <span class="icon-wrap" @click="emits('update-list')">
          <el-icon><Refresh /></el-icon>
        </span>
        <el-popover placement="bottom-start" :width="336" trigger="click" popper-class="setting-popper">
          <template #reference>
            <span class="icon-wrap">
              <el-icon><Setting /></el-icon>
            </span>
          </template>
          <template #default>
            <div class="flex">
              <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange"
                >数据列
              </el-checkbox>
              <el-checkbox v-model="isSelectionCol">多选列</el-checkbox>
              <el-checkbox v-model="isIndexCol">序号列</el-checkbox>
              <el-button type="text" class="reset" @click="init">重置</el-button>
            </div>
            <el-divider />
            <el-checkbox-group v-model="checkedList" @change="handleCheckedChange">
              <div class="flex item" v-for="item in plainSortOptions" :key="item.prop">
                <el-icon size="16" class="move"><Rank /></el-icon>
                <el-checkbox :label="item.prop">{{ item.label }}</el-checkbox>
                <div class="fixed">
                  <SvgIcon
                    name="fixed-l"
                    size="18"
                    :class="{ on: item.fixed === 'left' }"
                    @click="handleItemfixed(item.prop!, 'left')"
                  />
                  <el-divider direction="vertical" />
                  <SvgIcon
                    name="fixed-r"
                    size="18"
                    :class="{ on: item.fixed === 'right' }"
                    @click="handleItemfixed(item.prop!, 'right')"
                  />
                </div>
              </div>
            </el-checkbox-group>
          </template>
        </el-popover>
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
<style lang="scss">
.setting-popper {
  .flex {
    display: flex;
    align-items: center;

    .reset {
      margin-left: 30px;
    }

    &.item {
      .move {
        cursor: move;
        margin-right: 8px;
      }

      .el-checkbox {
        flex: 1;
      }

      .fixed {
        display: flex;
        align-items: center;

        .svg-icon {
          color: #c1c1c1;
          cursor: pointer;

          &.on {
            color: var(--el-color-primary);
          }
        }

        .el-divider {
          margin: 0 8px;
          height: 14px;
        }
      }
    }
  }

  .el-divider {
    margin: 8px 0;
  }
}
</style>
