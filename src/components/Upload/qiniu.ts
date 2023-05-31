import * as qiniu from "qiniu-js";
import { Config, Extra } from "qiniu-js/esm/upload";
import { getQiniuToken } from "@/api/public";

/**
 * @description: 上传七牛云
 * @param {File} file File 对象，上传的文件
 * @param {String} fname  文件原文件名 "qiniu.txt"
 * @return {*}
 */
export async function qiniuUpload(file: File, fname: string) {
  // 获取上传信息
  const {
    data: { token, key, uphost },
  } = await getQiniuToken();
  // 上传任务的配置信息
  const config: Config = {
    useCdnDomain: true,
    region: qiniu.region.z2,
    uphost,
    upprotocol: "http",
  };
  // 上传文件的资源信息配置
  const putExtra: Extra = {
    fname,
  };

  const observable = qiniu.upload(file, key, token, putExtra, config);
  // 上传
  observable.subscribe({
    next({ total }) {
      console.log(total);
    },
    error({ message }) {
      console.log(message, "上传错误信息");
    },
    // 接收上传完成后的后端返回信息，具体返回结构取决于后端 SDK 的配置
    complete(res) {
      console.log(res);
    },
  });
}
