import { VNode } from "vue";
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";

export type RenderScope<T> = {
  row: T;
  $index: number;
  column: TableColumnCtx<T>;
  [key: string]: any;
};

export type HeaderRenderScope<T> = {
  $index: number;
  column: TableColumnCtx<T>;
  [key: string]: any;
};
// 表格子项配置
export interface TableCol<T = any> extends Partial<Omit<TableColumnCtx<T>, "renderCell" | "renderHeader">> {
  type?: "selection" | "index" | "expand" | "image" | "date";
  headerRender?: (scope: HeaderRenderScope<T>) => VNode; // 自定义表头内容渲染（tsx语法）
  render?: (scope: RenderScope<T>) => VNode | string; // 自定义单元格内容渲染（tsx语法）
}
