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
  type?: "input" | "date" | "select";
  option?: { value: string | number; label: string }[];
  elProps?: any;
  rule?: any;
}
export { formJsonItem };
