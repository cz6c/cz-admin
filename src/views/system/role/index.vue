<template>
  <ListContainer title="角色列表" :loading="loading" @update-list="getList">
    <template #search>
      <el-form :model="otherParams">
        <el-form-item>
          <el-input v-model="otherParams.roleName" placeholder="nickname" />
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="otherParams.createTime" type="date" placeholder="createTime" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #action>
      <el-button type="primary" @click="add">新增角色</el-button>
    </template>
    <template #table>
      <el-table
        height="calc(100% - 40px)"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="roleName" width="180" prop="roleName" />
        <el-table-column label="menuIds" min-width="120" prop="menuIds" />
        <el-table-column label="状态" width="120">
          <template #default="{ row }">
            <el-switch v-model="row.status" @click="statusChange(row)" :active-value="1" :inactive-value="0" />
          </template>
        </el-table-column>
        <el-table-column label="createTime" min-width="200" prop="createTime" />
        <el-table-column label="remark" min-width="200" prop="remark" />
        <el-table-column label="操作" width="130">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="del(row.id)">Detail</el-button>
            <el-button link type="primary" size="small" @click="edit(row.id)">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-wrap">
        <el-pagination
          v-model:current-page="apiQuery.page"
          v-model:page-size="apiQuery.limit"
          :page-sizes="[20, 50, 75, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listTotal"
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <RoleDrawerEdit v-model="_isEdit" :id="_id" @update-list="getList" />
    </template>
  </ListContainer>
</template>
<script setup lang="ts" name="Role">
import { ref, reactive } from "vue";
import { getRoleListApi, statusChangeApi, delRoleApi } from "@/api/system/role";
import RoleDrawerEdit from "./components/RoleDrawerEdit.vue";
import { useTable } from "@/components/ListContainer/useTable";

const getListApi = getRoleListApi;
const delApi = delRoleApi;
const otherParams = reactive({ roleName: "", createTime: "" });
const {
  loading,
  _isEdit,
  _id,
  apiQuery,
  listTotal,
  tableData,
  getList,
  handleSizeChange,
  handleCurrentChange,
  statusChange,
  add,
  edit,
  del,
} = useTable({
  getListApi,
  statusChangeApi,
  delApi,
  otherParams,
});

/**
 * @description: 重置搜索
 */
function reset() {
  otherParams.roleName = "";
  otherParams.createTime = "";
  getList();
}

let selectList: any = ref([]);

/**
 * @description: 列表选中
 * @param {*} selection
 */
function handleSelectionChange(selection: any[]) {
  selectList.value = selection || [];
}
</script>

<style lang="scss" scoped>
.pagination-wrap {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
}
</style>
