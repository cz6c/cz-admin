export const props = {
  // 表格接口数据
  data: {
    type: Array,
    default: () => [],
  },
  // 表格列表数据
  columnList: {
    type: Array,
    default: () => [],
  },
  // 表格线条
  border: {
    type: Boolean,
    default: true,
  },
  // 表格高度
  tableHeight: {
    type: String,
    default: "",
  },
  // 表格宽度
  tableWidth: {
    type: String,
    default: "100%",
  },
  // 是否需要序号
  indexColum: {
    type: Boolean,
    default: true,
  },
  // 是否多选操作
  isSelection: {
    type: Boolean,
    default: false,
  },
  // 是否loading
  isLoading: {
    type: Boolean,
    default: true,
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
  // 表格可点击
  highlightCurrentRow: {
    type: Boolean,
    default: false,
  },
  // 是否显示双击查看详情提示
  isDclickDetails: {
    type: Boolean,
    default: true,
  },
  // 是否为斑马纹 table
  stripe: {
    type: Boolean,
    default: false,
  },
  // 是否可以通过点击行实现切换当前行的状态，不清除其他行的状态，多选
  isMultiple: {
    type: Boolean,
    default: false,
  },
  // 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
};
export const emits = ["selectAll", "selectionChange", "sortChange", "dclick", "currentChange"];
