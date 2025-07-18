/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-05-30 16:05:17
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-18 11:27:05
 * @FilePath: /nuxt3-scaffold/template/types/user.d.ts
 * @Description:
 */
interface SignInUserInfo {
  userId: string;
  flag: 0 | 2;
  createTime: number;
  extraVo?: {
    loginDays: number;
    lastLoginTime: number;
  };
}
