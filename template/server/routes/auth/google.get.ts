/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-04-25 20:06:05
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-16 19:55:19
 * @FilePath: /nuxt3-scaffold/template/server/routes/auth/google.get.ts
 * @Description:
 */
export default defineOAuthGoogleEventHandler({
  config: {},
  async onSuccess(event, token) {
    console.log(event.path);
    console.log(JSON.stringify(token));
    return {
      code: 0,
      data: token,
    };
  },
  async onError(event, error) {
    console.log(error);
  },
});
