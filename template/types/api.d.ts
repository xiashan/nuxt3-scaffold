/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-06-03 19:37:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2026-04-21 11:22:57
 * @FilePath: /nuxt3-scaffold/template/types/api.d.ts
 * @Description: API
 */
interface ResponseData<T = object> {
  data: T;
  code: number;
  msg: string;
}
interface ResponseDataList<T = object> {
  dataList: T[];
  code: number;
  msg: string;
}

interface FetcherParams {
  page: number;
  pageSize: number;
  reset: boolean;
}
