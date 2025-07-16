/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-06-17 16:53:47
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-16 19:47:16
 * @FilePath: /nuxt3-scaffold/template/stores/auth.ts
 * @Description:
 */
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const isAuthModalShow = ref(false);

  const requestSignIn = async () => {};

  return {
    isAuthModalShow,

    requestSignIn,
  };
});
