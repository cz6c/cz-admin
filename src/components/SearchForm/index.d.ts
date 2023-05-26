import { BreakPoint, Responsive } from "@/components/Grid/interface";
import { VNode } from "vue";
export type SearchRenderScope = {
  searchParam: { [key: string]: any };
  placeholder: string;
  clearable: boolean;
  options: any[];
  data: any[];
};

// 表单配置项
type FormJsonItem = {
  prop: string;
  label: string;
  data: any;
  initilaData: any;
  itemLabelWidth?: string | number;
  span?: number;
  required?: boolean;
  placeholder?: string;
  type?:
    | "input"
    | "input-number"
    | "select"
    | "select-v2"
    | "tree-select"
    | "cascader"
    | "date-picker"
    | "time-picker"
    | "time-select"
    | "switch"
    | "slider";
  options?: { value: string | number; label: string }[];
  elProps?: any;
  rule?: any;
  disabled?: boolean;
  offset?: number; // 搜索字段左侧偏移列数
  render?: (scope: SearchRenderScope) => VNode; // 自定义搜索内容渲染（tsx语法）
} & Partial<Record<BreakPoint, Responsive>>;
export { FormJsonItem };
