/*
 * @Author: xiashan
 * @Date: 2025-08-12 11:18:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-10-24 14:47:21
 * @Description:
 */
export const logout = () => {
  return $api<ResponseData<{ result: boolean }>>("/api/auth/logout", {
    method: "POST",
  });
};
