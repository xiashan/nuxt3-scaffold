/*
 * @Author: xiashan
 * @Date: 2025-10-24 14:14:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-10-24 15:38:26
 * @Description:
 */
import { commonResponseData } from "~/server/scripts/response";
import { requestLogout } from "~/server/services/auth";

export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event);
  if (!user?.access_token) {
    clearUserSession(event);
    return commonResponseData({ result: true });
  }

  await requestLogout(user!.access_token);
  clearUserSession(event);
  return commonResponseData({ result: true });
});
