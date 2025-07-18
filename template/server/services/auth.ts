/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-05-27 16:42:15
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-18 11:59:55
 * @FilePath: /nuxt3-scaffold/template/server/services/auth.ts
 * @Description: cas验证成功后从业务代码的后端获取用户信息
 */
export const requestAuthLogin = async (data: any) => {
  const proxy = useRuntimeConfig().private.proxy;
  return $fetch<
    ResponseData<{
      userId: string;
      nickName: string;
      avatar: string;
    }>
  >("/robot/user/login", {
    method: "POST",
    baseURL: proxy.target,
    headers: {
      userId: data.userId,
    },
    body: {
      ...data,
    },
  });
};
