// 表格配置项
interface TableJsonItem {
  prop: string;
  label: string;
  type?: "text" | "switch" | "slot";
  width?: string | number;
  formatData?: any;
  slotName?: string;
}

// eltable 配置
interface ElTableConfig {
  border: boolean;
}
export { TableJsonItem, ElTableConfig };
