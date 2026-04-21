/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-05-07 10:12:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2026-04-21 11:07:19
 * @FilePath: /nuxt3-scaffold/template/server/routes/robot/[...all].ts
 * @Description:
 */

import { createProxyEventHandler } from "h3-proxy";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const target = config.private.proxy.target;
  const { user } = await getUserSession(event);

  let lang = getRequestHeader(event, "locale");
  lang = lang || (await event.context._i18nLocale!());
  return createProxyEventHandler({
    target: target,
    pathFilter: ["/fire/**"],
    enableLogger: process.env.NODE_ENV !== "production",
    configureProxyRequest: () => {
      return {
        headers: {
          Authorization: `Bearer ${user?.access_token ?? ""}`,
          lan_code: lang,
        },
      };
    },
  })(event);
});
