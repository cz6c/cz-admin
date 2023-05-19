import { VNodeChild, CSSProperties } from "vue";
interface Pagination {
  total?: number; // 总条目数
  currentPage: number; // 当前页数，支持 v-model 双向绑定
  pageSize: number; // 每页显示条目个数，支持 v-model 双向绑定
  pageSizes?: number[]; // 每页显示个数选择器的选项设置
  layout?: string; // 组件布局，子组件名用逗号分隔
  background?: boolean; // 是否为分页按钮添加背景色
}
// 表格配置
interface TableOptions {
  height?: string | number;
  // Table 的高度， 默认为自动高度。 如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。
  stripe?: boolean; // 是否为斑马纹 table
  maxHeight?: string | number; // Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
  size?: "large" | "default" | "small"; // Table 的尺寸
  showHeader?: boolean; // 是否显示表头,
  tooltipEffect?: "dark" | "light"; // tooltip effect 属性
  pagination?: boolean; // 是否展示分页器
  paginationConfig?: Pagination; // 分页器配置项，详情见下方 paginationConfig 属性,
  headerCellStyle?: CSSProperties; // 表头单元格的style样式，是一个object为所有表头单元格设置一样的 Style。注：CSSProperties类型就是一个对象，像正常在style中写css一样 {color: #f00}
  rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染。
}
// 表格子项配置
interface TableJsonItem {
  columnType?: "text" | "image" | "date" | "slot";
  type?: "selection" | "index" | "expand";
  prop: string;
  align?: string;
  slot?: boolean;
  dateFormat: string; // 显示在页面中的日期格式
  render?: (row?: any, index?: number) => VNodeChild; // 渲染函数，渲染这一列的每一行的单元格
  children: TableJsonItem[]; // 配置多级表头的数据集合, 具体用法可参考多级表头使用示例。
  headerRender?: ({ column, index }: { column: any; index: number }) => VNodeChild; // 渲染函数，渲染列表头
  headerSlot?: string; // 自定义表头插槽名字
}
export { TableJsonItem, TableOptions };
