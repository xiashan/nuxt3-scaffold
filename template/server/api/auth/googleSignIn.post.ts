/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-05-28 16:06:55
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-18 11:58:04
 * @FilePath: /nuxt3-scaffold/template/server/api/auth/googleSignIn.post.ts
 * @Description:
 */
import { z } from "zod";
import {
  commonResponseData,
  commonResponseError,
} from "~/server/scripts/response";
import { requestThirdLogin, requestCasUserInfo } from "~/server/services/cas";
import { requestAuthLogin } from "~/server/services/auth";
const schema = z.object({
  code: z.string(),
});
export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body) =>
    schema.safeParse(body),
  );
  if (!result.success) {
    return commonResponseError(1);
  } else {
    const body = result.data;
    const code = body.code;
    const res = await requestThirdLogin(code, "google");
    if ("code" in res) {
      return commonResponseError(res.code, res.msg);
    } else {
      const casUserInfoRes = await requestCasUserInfo(
        res.openid,
        res.access_token,
      );
      const loginRes = await requestAuthLogin({
        ...casUserInfoRes.data,
        userId: res.openid,
      });
      await replaceUserSession(event, {
        user: {
          id: res.openid,
          nickName: loginRes.data.nickName,
          avatar: casUserInfoRes.data.avatar,
        },
      });
      return commonResponseData(loginRes.data);
    }
  }
});
