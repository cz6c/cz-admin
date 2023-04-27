import { TableJsonItem } from "./index.d";

export default {
  // 表格列表数据
  columns: {
    type: Array<TableJsonItem>,
    require: true,
  },
  // 表格数据接口
  api: {
    type: Function,
    require: true,
  },
  // 获取列表数据前操作 做参数处理
  beforeFetch: {
    type: Function,
  },
  // 获取列表数据后操作 做数据处理
  afterFetch: {
    type: Function,
  },
  // 列表搜索表单数据
  otherParams: {
    type: Object,
    default: () => {
      return {};
    },
  },
  // 是否需要分页器
  pagination: {
    type: Boolean,
    default: false,
  },
  // 列表对齐方式
  align: {
    type: String,
    default: "center",
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
    default: false,
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
};
