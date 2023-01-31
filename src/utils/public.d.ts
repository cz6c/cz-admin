// 表单配置项
interface formJsonItem {
  prop: string;
  label: string;
  data: any;
  initilaData: any;
  itemLabelWidth?: string | number;
  itemContentWidth?: string;
  required?: boolean;
  placeholder?: string;
  type?: "input" | "date" | "select" | "selectV2" | "switch" | "checkbox" | "radio";
  options?: { value: string | number; label: string }[];
  elProps?: any;
  rule?: any;
  disabled?: boolean;
}
// 表格配置项
interface tableJsonItem {
  prop: string;
  label: string;
  type?: "text" | "date" | "map" | "switch";
  map?: { value: string | number; label: string }[];
  width?: string | number;
}
export { formJsonItem, tableJsonItem };
