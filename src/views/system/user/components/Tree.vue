<template>
  <div class="dept-tree">
    <div class="tree-header" title="部门列表">
      <div class="title">部门列表</div>
      <el-input v-model="searchValue" size="small" placeholder="请输入部门名称" clearable>
        <template #suffix>
          <el-icon class="el-input__icon" />
        </template>
      </el-input>
      <el-dropdown :hide-on-click="false">
        <span class="icon">
          <el-icon><MoreFilled /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <div @click="toggleRowExpansionAll(isExpand ? false : true)">
                {{ isExpand ? "折叠全部" : "展开全部" }}
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="onReset">重置状态</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <el-tree
      ref="treeRef"
      :data="treeData"
      node-key="id"
      size="small"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
    >
      <template #default="{ node }">
        <span>
          {{ node.label }}
        </span>
      </template>
    </el-tree>
  </div>
</template>

<script setup lang="ts" name="Tree">
import { ref, watch, onMounted } from "vue";
import { getDeptList } from "@/api/system/dept";
import { DeptItem } from "@/api/system/dept/index.d";

const treeRef = ref();
const treeData = ref<DeptItem[]>([]);
const isExpand = ref(true);
const searchValue = ref("");
const defaultProps = {
  children: "children",
  label: "deptName",
};
const filterNode = (value: string, data: any) => {
  if (!value) return true;
  return data.deptName.includes(value);
};
/**
 * @description: 折叠展开
 * @param {*} status
 */
function toggleRowExpansionAll(status: boolean) {
  isExpand.value = status;
  const nodes = (treeRef.value as any).store._getAllNodes();
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].expanded = status;
  }
}
/**
 * @description: 重置状态（选中状态、搜索框值、树初始化）
 */
function onReset() {
  searchValue.value = "";
  toggleRowExpansionAll(true);
}

watch(searchValue, val => {
  treeRef.value!.filter(val);
});

onMounted(async () => {
  const { data } = await getDeptList();
  treeData.value = data.list;
});
</script>

<style lang="scss" scoped>
.dept-tree {
  background-color: #fff;

  .tree-header {
    display: flex;
    align-items: center;
    padding: 10px;

    .title {
      flex: 0 0 80px;
      font-size: 15px;
      font-weight: 700;
    }

    :deep(.el-input) {
      padding: 0 10px;
    }

    .icon {
      flex: 0 0 24px;
      cursor: pointer;
    }
  }
}
</style>
