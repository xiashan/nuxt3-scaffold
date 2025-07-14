/*
 * @Author: lishaonan lishaonan@noxgroup.com
 * @Date: 2025-03-20 10:23:15
 * @LastEditors: lishaonan lishaonan@noxgroup.com
 * @LastEditTime: 2025-04-27 16:28:43
 * @FilePath: /ai-robot/i18n/i18n.config.ts
 * @Description:
 *
 * Copyright (c) 2025 by NoxGroup, All Rights Reserved.
 */
// import en from "./locales/en.json";
// import cn from "./locales/zh-CN.json";
export default defineI18nConfig(() => ({
  legacy: false,
  // locale: "cn",
  // messages: {
  //   en,
  //   "zh-CN": cn,
  // },

  messageResolver: (obj: any, path) => {
    // simple message resolving!
    const msg = obj[path];
    return msg != null ? msg : null;
  },
}));
