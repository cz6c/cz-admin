import { formJsonItem } from "./public";

/**
 * @description: 将prop作为key  每一项作为value
 * @param {formJsonItem} rawList 表单配置
 * @return {*}
 */
const normalFormDataMap = (rawList: formJsonItem[]) => {
  const temp: Record<string, formJsonItem> = {};
  const list = Array.prototype.concat(...rawList);
  list.forEach((item: formJsonItem) => {
    const { prop } = item;
    temp[prop] = item;
  });
  return temp;
};

/**
 * @description: 将prop作为key  每一项的值作为value
 * @param {formJsonItem} rawList
 * @return {*}
 */
const extractData = (rawList: formJsonItem[]) => {
  const temp: Record<string, any> = {};
  const list = Array.prototype.concat(...rawList);
  list.forEach((item: formJsonItem) => {
    const { prop, data } = item;
    temp[prop] = data;
  });
  return temp;
};

export { normalFormDataMap, extractData };
