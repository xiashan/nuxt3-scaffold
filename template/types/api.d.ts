/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-06-03 19:37:37
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-18 11:28:20
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
