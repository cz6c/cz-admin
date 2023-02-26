<script setup lang="ts">
import { handleTree } from "@/utils/tree";
import { getDeptList } from "@/api/system/index";
import { ref, computed, watch, onMounted, getCurrentInstance } from "vue";

interface Tree {
  id: number;
  name: string;
  highlight?: boolean;
  children?: Tree[];
}

const treeRef = ref();
const treeData = ref([]);
const isExpand = ref(true);
const searchValue = ref("");
const highlightMap = ref({});
const { proxy } = getCurrentInstance();
const defaultProps = {
  children: "children",
  label: "name",
};
const buttonClass = computed(() => {
  return ["!h-[20px]", "reset-margin", "!text-gray-500", "dark:!text-white", "dark:hover:!text-primary"];
});

const filterNode = (value: string, data: Tree) => {
  if (!value) return true;
  return data.name.includes(value);
};

function nodeClick(value) {
  const nodeId = value.$treeNodeId;
  highlightMap.value[nodeId] = highlightMap.value[nodeId]?.highlight
    ? Object.assign({ id: nodeId }, highlightMap.value[nodeId], { highlight: false })
    : Object.assign({ id: nodeId }, highlightMap.value[nodeId], { highlight: true });
  Object.values(highlightMap.value).forEach((v: Tree) => {
    if (v.id !== nodeId) {
      v.highlight = false;
    }
  });
}

function toggleRowExpansionAll(status) {
  isExpand.value = status;
  const nodes = (proxy.$refs["treeRef"] as any).store._getAllNodes();
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].expanded = status;
  }
}

/** 重置状态（选中状态、搜索框值、树初始化） */
function onReset() {
  highlightMap.value = {};
  searchValue.value = "";
  toggleRowExpansionAll(true);
}

watch(searchValue, val => {
  treeRef.value!.filter(val);
});

onMounted(async () => {
  const { data } = await getDeptList();
  treeData.value = handleTree(data);
});
</script>

<template>
  <div class="h-full min-h-[780px] bg-bg_color overflow-auto">
    <div class="flex items-center h-[34px]">
      <p class="flex-1 ml-2 font-bold text-base truncate" title="部门列表">部门列表</p>
      <el-input v-model="searchValue" style="flex: 2" size="small" placeholder="请输入部门名称" clearable>
        <template #suffix>
          <el-icon class="el-input__icon"> </el-icon>
        </template>
      </el-input>
      <el-dropdown :hide-on-click="false">
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-button
                :class="buttonClass"
                link
                type="primary"
                @click="toggleRowExpansionAll(isExpand ? false : true)"
              >
                {{ isExpand ? "折叠全部" : "展开全部" }}
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button :class="buttonClass" link type="primary" @click="onReset"> 重置状态 </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-divider />
    <el-tree
      ref="treeRef"
      :data="treeData"
      node-key="id"
      size="small"
      :props="defaultProps"
      default-expand-all
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      @node-click="nodeClick"
    >
      <template #default="{ node, data }">
        <span
          :class="[
            'pl-1',
            'pr-1',
            'rounded',
            'flex',
            'items-center',
            'select-none',
            searchValue.trim().length > 0 && node.label.includes(searchValue) && 'text-red-500',
            highlightMap[node.id]?.highlight ? 'dark:text-primary' : '',
          ]"
          :style="{
            background: highlightMap[node.id]?.highlight ? 'var(--el-color-primary-light-7)' : 'transparent',
          }"
        >
          {{ node.label }}
        </span>
      </template>
    </el-tree>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-divider) {
  margin: 0;
}
</style>
