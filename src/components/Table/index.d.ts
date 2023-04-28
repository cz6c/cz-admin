// 表格配置项
interface TableJsonItem {
  columnType?: "text" | "switch" | "slot";
  prop: string; // 字段名称 对应列内容的字段名， 也可以使用 property属性
  label: string; // 列标题
  width?: string | number; // 列宽
  minWidth?: string | number; // 对应列的最小宽度
  formatData?: (data: any) => string; // 格式化数据方法
  fixed?: boolean | "left" | "right"; // 列是否固定在左侧或者右侧。 true 表示固定在左侧
  align?: "left" | "center" | "right"; // 列对齐方式
  sortable?: boolean | "custom"; // 对应列是否可以排序， 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
  elProps?: any; // el 其他配置
}
export { TableJsonItem };
