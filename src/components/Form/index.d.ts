// 表单配置项
interface FormJsonItem {
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
export { FormJsonItem };
