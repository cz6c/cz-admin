import { TableJsonItem } from "./index.d";

export default {
  // 表格接口数据
  data: {
    type: Array,
    default: () => [],
  },
  // 表格数据接口
  api: {
    type: Function,
    require: true,
  },
  // 表格列表数据
  columns: {
    type: Array<TableJsonItem>,
    require: true,
  },
  // 是否带有纵向边框
  border: {
    type: Boolean,
    default: true,
  },
  // 是否为斑马纹 table
  stripe: {
    type: Boolean,
    default: false,
  },
  // 可点击行高亮
  highlightCurrentRow: {
    type: Boolean,
    default: true,
  },
  // 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
  // 列表标题
  title: {
    type: String,
    default: "",
  },
  // 表格高度
  tableHeight: {
    type: String,
    default: "100%",
  },
  // 是否需要序号列
  indexColum: {
    type: Boolean,
    default: true,
  },
  // 是否需要多选列
  selectionColum: {
    type: Boolean,
    default: false,
  },
  // 是否需要可展开操作
  expandColum: {
    type: Boolean,
    default: false,
  },
  // 禁用选中的判断条件字段
  selectProp: {
    type: Object,
    default: () => {
      return {
        label: "",
        value: "",
      };
    },
  },
  // 是否显示双击查看详情提示
  isDclickDetails: {
    type: Boolean,
    default: true,
  },
  // 是否可以通过点击行实现切换当前行的状态，不清除其他行的状态，多选
  isMultiple: {
    type: Boolean,
    default: false,
  },
};
