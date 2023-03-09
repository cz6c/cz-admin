export function resultSuccess<T>(data: T, { message = "ok", code = 200 } = {}) {
  return {
    code,
    data,
    message,
  };
}

export function resultError({ message = "Request failed", code = 400 } = {}, data = null) {
  return {
    code,
    data,
    message,
  };
}

export function resultPageSuccess<T>(page: number, limit: number, list: T[]) {
  const offset = (page - 1) * Number(limit);
  const pageData =
    offset + Number(limit) >= list.length
      ? list.slice(offset, list.length)
      : list.slice(offset, offset + Number(limit));
  return {
    ...resultSuccess({
      list: pageData,
      page,
      limit,
      total: list.length,
    }),
  };
}

export interface requestParams {
  method: string;
  body: any;
  headers?: { token?: string };
  query: any;
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.token;
}
