import { computed } from "vue";
import { FormJsonItem } from "./index.d";

interface Options {
  rawList: FormJsonItem[];
}

/**
 * @description: 将prop作为key  配置项作为value
 * @param {FormJsonItem} rawList 表单配置
 * @return {*}
 */
export function normalFormDataMap(rawList: FormJsonItem[]): Record<string, FormJsonItem> {
  const temp: Record<string, FormJsonItem> = {};
  const list = Array.prototype.concat(...rawList);
  list.forEach((item: FormJsonItem) => {
    const { prop } = item;
    temp[prop] = item;
  });
  return temp;
}

/**
 * @description: 将prop作为key  配置项的data作为value
 * @param {FormJsonItem} rawList
 * @return {*}
 */
export function extractData(rawList: FormJsonItem[]): Record<string, any> {
  const temp: Record<string, any> = {};
  const list = Array.prototype.concat(...rawList);
  list.forEach((item: FormJsonItem) => {
    const { prop, data } = item;
    temp[prop] = data;
  });
  return temp;
}

export function useForm(options: Options) {
  const formDataMap = computed(() => {
    return normalFormDataMap(options.rawList);
  });

  const formData = computed(() => {
    return extractData(options.rawList);
  });

  return {
    formDataMap,
    formData,
  };
}
