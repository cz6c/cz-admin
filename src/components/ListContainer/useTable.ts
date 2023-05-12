import { reactive, ref, onMounted } from "vue";
import { isFunction } from "@/utils/is";
import { ElMessageBox } from "element-plus";
import { $message } from "@/utils/message";

export function useTable({
  getListApi,
  statusChangeApi,
  delApi,
  otherParams = {},
}: {
  getListApi: Function;
  statusChangeApi: Function;
  delApi: Function;
  otherParams: Record<string, any>;
}) {
  const loading = ref(false);
  const _isEdit = ref(false);
  const _id = ref(0);
  const tableData = ref([]);
  const apiQuery = reactive({
    page: 1,
    limit: 20,
  });
  const listTotal = ref(0);

  /**
   * @description: 获取列表数据
   */
  async function getList() {
    try {
      loading.value = true;
      const {
        data: { list, total },
      } = getListApi && isFunction(getListApi) && (await getListApi({ ...apiQuery, ...otherParams }));
      tableData.value = list || [];
      listTotal.value = total;
      setTimeout(() => {
        loading.value = false;
      }, 600);
    } catch (error: any) {
      loading.value = false;
      $message.warning(error.message);
    }
  }

  onMounted(() => {
    getList();
  });

  /**
   * @description: limit 改变
   */
  function handleSizeChange(value: number) {
    apiQuery.limit = value;
    apiQuery.page = 1;
    getList();
  }
  /**
   * @description: page 改变
   */
  function handleCurrentChange(value: number) {
    apiQuery.page = value;
    getList();
  }

  /**
   * @description: 新增
   */
  function add() {
    console.log(111);
    _id.value = 0;
    _isEdit.value = true;
  }
  /**
   * @description: 编辑
   * @param {*} id
   */
  function edit(id: number) {
    _id.value = id;
    _isEdit.value = true;
  }
  /**
   * @description: 状态切换
   * @param {*} row
   */
  async function statusChange({ id, status }: { id: number; status: 0 | 1 }) {
    console.log(status);
    try {
      await statusChangeApi({ status, id });
      $message.success("切换成功");
      getList();
    } catch (error: any) {
      $message.error(error.message);
    }
  }
  /**
   * @description: 删除
   * @param {*} id
   */
  async function del(id: number) {
    ElMessageBox.confirm("proxy will permanently delete the file. Continue?", "Warning", {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    })
      .then(async () => {
        try {
          await delApi({ id });
          apiQuery.page = 1;
          getList();
          $message.success(`Delete completed`);
        } catch (error: any) {
          $message.error(error.message);
        }
      })
      .catch(() => {
        $message.info(`Delete canceled`);
      });
  }

  return {
    loading,
    _isEdit,
    _id,
    apiQuery,
    listTotal,
    tableData,
    getList,
    handleSizeChange,
    handleCurrentChange,
    statusChange,
    add,
    edit,
    del,
  };
}
