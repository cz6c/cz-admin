<script lang="ts">
import { ref, unref, resolveComponent, resolveDirective, withDirectives, h, getCurrentInstance } from "vue";
import { props, emits } from "./index";

export default {
  name: "TableView",
  props,
  emits,
  setup(props, { attrs, slots, emit, expose }) {
    console.log(props.data, slots);
    const instance = getCurrentInstance();
    const tableKey = ref(+new Date());
    let checkedKeys = ref(false);
    let isShowTips = ref(false);
    let tipsTop = ref(0);
    let tipsLeft = ref(0);
    const dragTable = ref(null);
    function selectAll() {
      const selectAll = unref(dragTable).checkedKeys;
      if (selectAll) {
        checkedKeys = true;
        unref(dragTable).checkedKeys = false;
      } else {
        checkedKeys = !checkedKeys.value;
      }
      const arr = props.data.filter(row => {
        const { label, value } = props.selectProp;
        return !value.includes(row[label]);
      });
      select(arr, checkedKeys);
    }
    function select(data, flag) {
      if (data) {
        data.forEach(row => {
          unref(dragTable).toggleRowSelection(row, flag);
          if (row.children != undefined || row.children != "") {
            select(row.children, checkedKeys);
          }
        });
      }
    }
    // ----------- 策略模式 --------------
    const strategy = {
      /**
       * 默认文本框
       */
      text: (prop, item) => {
        // console.log(item);
        return ({ row: data }) => {
          console.log(data);

          const propList = prop.trim().split(".");
          propList.forEach(it => {
            if (!data) return;
            data = data[it];
          });
          return h("span", {}, data);
        };
      },
    };
    // ----------- 策略结束 --------------

    // ----------- 组合el-table-column -------------
    const elTableColumn = resolveComponent("el-table-column");
    const spliceColumn = data => {
      const columnList = [];
      data.forEach((titleItem, index) => {
        const {
          label,
          prop,
          type = "text",
          align = "center",
          width,
          minWidth,
          hidden = false,
          fixed,
          showOverflowTooltip = true,
          required,
          sortable,
        } = titleItem;

        // 计算label共多少个字符
        let realLength = 0;
        const len = label.length;
        let charCode = -1;
        if (!label) {
          realLength = 0;
        }
        for (let i = 0; i < len; i++) {
          charCode = label.charCodeAt(i);
          if (charCode >= 0 && charCode <= 128) realLength += 1;
          else realLength += 2;
        }
        // 每格宽度
        const thWidth = 20 + realLength * 8;
        try {
          const vnode = h(
            elTableColumn,
            {
              key: index,
              prop: prop,
              label: `${required ? "*" : ""} ${label}`,
              align,
              sortable,
              width,
              minWidth: minWidth || thWidth,
              fixed,
              showOverflowTooltip,
            },
            {
              default: () => strategy[type](prop, titleItem),
            },
          );
          !hidden && columnList.push(vnode);
        } catch (error) {
          console.error(`没有${type}这个类型`, error);
        }
      });

      return columnList;
    };
    const columnList = spliceColumn(props.columnList);
    // ----------- 组合结束 ------------------------

    // ------------- 功能 开始 --------------
    // 序号
    if (props.indexColum) {
      columnList.unshift(
        h(elTableColumn, {
          type: "index",
          align: "center",
          label: "序号",
          width: "50",
          fixed: "left",
        }),
      );
    }
    // checkbox选择
    if (props.isSelection) {
      columnList.unshift(
        h(elTableColumn, {
          type: "selection",
          align: "center",
          width: "50",
          reserveSelection: true,
          selectable: row => {
            const { label, value } = props.selectProp;
            return row[label] != value;
          },
        }),
      );
    }

    // ------------- 功能 结束 --------------
    const elTable = resolveComponent("el-table");
    const tableVnode = h(
      elTable,
      {
        ...props,
        data: props.data,
        border: props.border,
        // height: props.tableHeight,
        rowKey: "id",
        highlightCurrentRow: props.highlightCurrentRow,
        stripe: props.stripe,
        // defaultExpandAll: props.defaultExpandAll,
        // width: props.tableWidth,
        key: tableKey,
        ref: unref(dragTable),
        // 选择改变
        onSelectionChange: value => {
          emit("selectionChange", value);
          // if (value.length > 1 || value.length === 0) {
          //   this.$parent.className === "pane" && this.$parent.$parent.$parent.changeShow(false);
          // }
        },
        // 排序改变
        onSortChange: value => {
          emit("sortChange", value);
        },
        // 双击改变
        onRowDblclick: value => {
          emit("dclick", value);
        },
        // 单击改变
        onRowClick: row => {
          // 如果此行禁止选中,单机时也不选中
          const { label, value } = props.selectProp;
          if (row[label] === value) {
            return;
          }
          if ((!props.highlightCurrentRow && !props.isMultiple) || row === -1) return;
          !props.isMultiple && unref(dragTable).clearSelection();
          unref(dragTable).toggleRowSelection(row);
          emit("currentChange", row);
          // this.$parent.className === "pane" && this.$parent.$parent.$parent.changeShow(true);
        },
        onCellMouseEnter: () => {
          isShowTips = true;
        },
        onCellMouseLeave: () => {
          isShowTips = false;
        },
        // 当表格宽度发生改变时，更新表格列宽度
        onHeaderDragend: () => {
          unref(dragTable).layout.updateColumnsWidth();
        },
        onSelectAll: value => {
          emit("selectAll", value);
          selectAll();
        },
      },
      {
        default: () => columnList,
      },
    );
    console.log(tableVnode);

    // const loadingDir = resolveDirective("loading");
    // const dirTable = withDirectives(tableVnode, [[loadingDir, true]]);

    const dblclick =
      props.isDclickDetails &&
      h(
        "div",
        {
          class: "table-tips",
          left: `${tipsLeft.value}px`,
          top: `${tipsTop.value}px`,
          // display: isShowTips ? "block" : "none",
          opacity: isShowTips.value ? 1 : 0,
        },
        "双击列表查看详情",
      );

    return () =>
      h(
        "div",
        {
          class: `table-wrap`,
          // height: props.tableHeight,
          onMousemove: e => {
            tipsLeft = e.clientX + 8;
            tipsTop = e.clientY + 16;
          },
        },
        {
          default: () => [tableVnode, dblclick],
          name: () => slots.name && slots.name(),
        },
      );
  },
};
</script>

<style lang="scss" scoped>
:deep(.sortable-ghost) {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
:deep(.drag-handler) {
  width: 20px !important;
  height: 20px !important;
  cursor: move;
}
.table-wrap {
  height: 100%;
}
</style>
