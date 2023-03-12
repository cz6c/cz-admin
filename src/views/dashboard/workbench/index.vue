<template>
  <div class="page">
    <el-row>
      <el-col :span="8"><div class="grid-content ep-bg-purple"></div></el-col>
      <el-col :span="8"><div class="grid-content ep-bg-purple-light"></div></el-col>
      <el-col :span="18"><div class="grid-content ep-bg-purple"></div></el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts" name="LoginLog"></script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
