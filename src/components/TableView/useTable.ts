import { reactive, ref, onMounted, toRefs } from "vue";
import { isFunction } from "@/utils/is";
import { $message } from "@/utils/message";
import { TableProps } from "./index.vue";
import { GetListParams } from "@/api/public/index.d";

interface State {
  loading: boolean;
  tableData: any[];
  apiQuery: GetListParams;
}

export function useTable(props: TableProps) {
  // const loading = ref(false);
  // const tableData = ref([]);
  // const apiQuery = reactive<GetListParams>({
  //   page: 1,
  //   limit: 20,
  //   total: 0,
  // });
  const state = reactive<State>({
    loading: false,
    tableData: [],
    apiQuery: {
      page: 1,
      limit: 20,
      total: 0,
    },
  });

  /**
   * @description: 获取列表数据
   */
  async function getList() {
    try {
      state.loading = true;
      const params = props.pagination ? { ...state.apiQuery } : {};
      const { data } = props.getListApi && isFunction(props.getListApi) && (await props.getListApi(params));
      state.tableData = props.pagination ? data.list : data;
      if (props.afterFetch && isFunction(props.afterFetch)) {
        state.tableData = (await props.afterFetch(state.tableData)) || state.tableData;
      }
      const { page, limit, total } = data;
      props.pagination && Object.assign(state.apiQuery, { page, limit, total });
      state.loading = false;
    } catch (error: any) {
      state.loading = false;
      $message.warning(error.message);
    }
  }

  onMounted(() => {
    getList();
  });

  return {
    ...toRefs(state),
    getList,
  };
}
