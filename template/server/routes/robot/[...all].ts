/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-05-07 10:12:00
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-16 19:55:40
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
    pathFilter: ["/robot/**"],
    enableLogger: process.env.NODE_ENV !== "production",
    configureProxyRequest: () => {
      return {
        headers: {
          client_id: config.private.cas.clientId,
          user_id: user?.id ?? "",
          lan_code: lang,
        },
      };
    },
  })(event);
});
