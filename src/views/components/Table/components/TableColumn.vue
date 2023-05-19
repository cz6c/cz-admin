<script lang="ts" setup>
import Table from "../index.d";
import dayjs from "dayjs";
defineProps<{ col: Table.TableJsonItem }>();
</script>
<template>
  <!-- 如果有配置多级表头的数据，则递归该组件 -->
  <template v-if="col.children?.length">
    <el-table-column v-bind="col">
      <TableColumn v-for="item in col.children" :col="item" :key="item.prop">
        <template v-for="slot in Object.keys($slots)" #[slot]="scope: Record<string, any>">
          <slot :name="slot" v-bind="scope"></slot>
        </template>
      </TableColumn>
      <template #header="{ column, $index }">
        <component v-if="col.headerRender" :is="col.headerRender" :column="column" :index="$index" />
        <slot v-else-if="col.headerSlot" :name="col.headerSlot" :column="column" :index="$index"></slot>
        <span v-else>{{ column.label }}</span>
      </template>
    </el-table-column>
  </template>
  <!-- 其他正常列 -->
  <el-table-column v-else v-bind="col">
    <!-- 自定义表头 -->
    <template #header="{ column, $index }">
      <component v-if="col.headerRender" :is="col.headerRender" :column="column" :index="$index" />
      <slot v-else-if="col.headerSlot" :name="col.headerSlot" :column="column" :index="$index"></slot>
      <span v-else>{{ column.label }}</span>
    </template>
    <template #default="{ row, $index }">
      <!---图片 (START)-->
      <el-image
        v-if="col.columnType === 'image'"
        preview-teleported
        :hide-on-click-modal="true"
        :preview-src-list="[row[col.prop!]]"
        :src="row[col.prop!]"
        fit="cover"
        class="w-9 h-9 rounded-lg"
      />
      <!---图片 (END)-->
      <!--- 格式化日期 (本项目日期是时间戳，这里日期格式化可根据你的项目来更改) (START)-->
      <template v-else-if="col.columnType === 'date'">
        <!---十位数时间戳-->
        <span v-if="String(row[col.prop!])?.length <= 10">
          {{ dayjs.unix(row[col.prop!]).format(col.dateFormat ?? "YYYY-MM-DD") }}
        </span>
        <!---十三位数时间戳-->
        <span v-else>{{ dayjs(row[col.prop!]).format(col.dateFormat ?? "YYYY-MM-DD") }}</span>
      </template>
      <!--- 格式化日期 (本项目日期是时间戳，这里日期格式化可根据你的项目来更改) (END)-->
      <!-- render函数 (START) 使用内置的component组件可以支持h函数渲染和txs语法-->
      <component v-else-if="col.render" :is="col.render" :row="row" :index="$index" />
      <!-- render函数 (END) -->
      <!-- 自定义slot (START) -->
      <slot v-else-if="col.slot" :name="col.slot" :row="row" :index="$index"></slot>
      <!-- 自定义slot (END) -->
      <!-- 默认渲染 (START) -->
      <span v-else>{{ row[col.prop!] }}</span>
      <!-- 默认渲染 (END) -->
    </template>
  </el-table-column>
</template>
