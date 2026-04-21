/*
 * @Author: xiashan
 * @Date: 2025-07-18 13:58:59
 * @LastEditors:
 * @LastEditTime: 2026-04-21 11:09:02
 * @Description:
 */
// auth.d.ts
declare module "#auth-utils" {
  interface User {
    // Add your own fields
    openid: string;
    username: string;
    email: string;
    nickname: string;
    avatar: string;
    access_token?: string;
  }
}

export {};
