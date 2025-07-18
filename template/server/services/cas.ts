/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-04-29 18:52:10
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-18 12:02:13
 * @FilePath: /nuxt3-scaffold/template/server/services/cas.ts
 * @Description: cas服务验证登录信息
 */
export const requestThirdLogin = async (
  code: string,
  provider: "userName" | "google",
) => {
  const casConfig = useRuntimeConfig().private.cas;
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
  >("/login/third", {
    method: "POST",
    baseURL: casConfig.baseURL,
    body: {
      client_id: casConfig.clientId,
      provider: provider,
      code: code,
    },
  });
};
export const requestCasUserInfo = async (
  openid: string,
  access_token: string,
) => {
  const casConfig = useRuntimeConfig().private.cas;
  return $fetch<{
    code: number;
    msg: string;
    data: {
      nickName: string;
      id: number;
      email: string;
      avatar: string;
    };
  }>("/api/user_info", {
    method: "POST",
    baseURL: casConfig.baseURL,
    body: {
      openid,
      access_token,
    },
  });
};
