/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-06-13 16:14:34
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-16 20:05:44
 * @FilePath: /nuxt3-scaffold/template/utils/isWhat.ts
 * @Description:
 */
export const isArray = (value: any) => {
  return Array.isArray(value);
};
export const isBoolean = (value: any) => {
  return typeof value === "boolean";
};
export const isString = (value: any) => {
  return typeof value === "string";
};
export const isFunction = (value: any) => {
  return typeof value === "function";
};

export const isNumber = (value: any) => {
  return typeof value === "number";
};

export const isObject = (value: any) => {
  return typeof value === "object";
};

export const isClient =
  typeof window !== "undefined" && typeof document !== "undefined";
