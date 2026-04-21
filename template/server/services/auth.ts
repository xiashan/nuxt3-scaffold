/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-05-27 16:42:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2026-04-21 11:19:24
 * @FilePath: /ai-kairo/frontend/server/services/auth.ts
 * @Description: cas验证成功后从业务代码的后端获取用户信息
 */
import type { User } from "#auth-utils";

export const requestThirdLogin = async (
  code: string,
  provider: "userName" | "google",
) => {
  const casConfig = useRuntimeConfig().private.cas;
  const proxy = useRuntimeConfig().private.proxy;
  return $fetch<
    | { code: number; msg: string }
    | {
        access_token: string;
        token_type: "OAuth2";
        scope: string;
        openid: string;
        refresh_token: string;
        expires_in: number;
      }
  >("/auth/login/third", {
    method: "POST",
    baseURL: proxy.target,
    body: {
      client_id: casConfig.clientId,
      provider: provider,
      code: code,
    },
  });
};

export const requestAuthUser = async (accessToken: string) => {
  const proxy = useRuntimeConfig().private.proxy;
  return $fetch<User>("/auth/user-info", {
    method: "GET",
    baseURL: proxy.target,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const requestLogout = async (accessToken: string) => {
  const proxy = useRuntimeConfig().private.proxy;
  return $fetch<User>("/auth/logout", {
    method: "POST",
    baseURL: proxy.target,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
