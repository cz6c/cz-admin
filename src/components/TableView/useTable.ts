import { reactive, onMounted, toRefs, computed } from "vue";
import { isFunction } from "@/utils/is";
import { $message } from "@/utils/message";
import { TableProps } from "./index.vue";
import { GetListParams } from "@/api/public/index.d";
import { SearchProps } from "@/components/SearchForm/type";

interface State {
  loading: boolean;
  tableData: any[];
  apiQuery: GetListParams;
  searchParam: Record<string, any>;
}

export function useTable(props: TableProps) {
  const state = reactive<State>({
    loading: false,
    tableData: [],
    apiQuery: {
      page: 1,
      limit: 20,
      total: 0,
    },
    searchParam: {},
  });

  /**
   * @description: 获取列表数据
   */
  async function getList() {
    try {
      state.loading = true;
      let params = props.pagination ? { ...state.apiQuery, ...state.searchParam } : { ...state.searchParam };
      if (props.beforeFetch && isFunction(props.beforeFetch)) {
        params = props.beforeFetch(params);
      }
      const { data } = props.getListApi && isFunction(props.getListApi) && (await props.getListApi(params));
      state.tableData = props.pagination ? data.list : data;
      if (props.afterFetch && isFunction(props.afterFetch)) {
        state.tableData = (await props.afterFetch(state.tableData)) || state.tableData;
      }
      const { page, limit, total } = data;
      props.pagination && Object.assign(state.apiQuery, { page, limit, total });
    } catch (error: any) {
      $message.warning(error.message);
    } finally {
      state.loading = false;
    }
  }

  /**
   * @description: 切换pageSize
   * @param {number} pageSize
   */
  const pageSizeChange = (pageSize: number) => {
    state.apiQuery.page = 1;
    state.apiQuery.limit = pageSize;
    getList();
  };

  /**
   * @description: 切换currentPage
   * @param {number} currentPage
   */
  const currentPageChange = (currentPage: number) => {
    state.apiQuery.page = currentPage;
    getList();
  };

  // 计算搜索项的初始值
  const initData = computed(() => {
    const temp: Record<string, any> = {};
    const list = Array.prototype.concat(...props.searchColumns!);
    list.forEach((item: SearchProps) => {
      const { prop, defaultValue } = item;
      temp[prop] = defaultValue;
    });
    return temp;
  });
  /**
   * @description: 重置搜索
   */
  function reset() {
    Object.assign(state.searchParam, initData.value);
    Object.assign(state.apiQuery, {
      page: 1,
      limit: 20,
      total: 0,
    });
    getList();
  }
  onMounted(() => {
    reset();
  });
  return {
    ...toRefs(state),
    getList,
    reset,
    pageSizeChange,
    currentPageChange,
  };
}
