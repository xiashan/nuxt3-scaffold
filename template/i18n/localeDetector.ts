/*
 * @Author: lishaonan lishaonan@noxgroup.com
 * @Date: 2025-03-20 10:28:40
 * @LastEditors: lishaonan lishaonan@noxgroup.com
 * @LastEditTime: 2025-04-27 11:58:09
 * @FilePath: /ai-robot/i18n/localeDetector.ts
 * @Description:
 *
 * Copyright (c) 2025 by NoxGroup, All Rights Reserved.
 */
// Detect based on query, cookie, header
export default defineI18nLocaleDetector((event, config) => {
  // try to get locale from query
  const query = tryQueryLocale(event, { lang: "" }); // disable locale default value with `lang` option
  if (query) {
    return query.toString();
  }

  // try to get locale from cookie
  const cookie = tryCookieLocale(event, { lang: "", name: "i18n_redirected" }); // disable locale default value with `lang` option
  if (cookie) {
    return cookie.toString();
  }

  // try to get locale from header (`accept-header`)
  const header = tryHeaderLocale(event, { lang: "" }); // disable locale default value with `lang` option
  if (header) {
    return header.toString();
  }

  // If the locale cannot be resolved up to this point, it is resolved with the value `defaultLocale` of the locale config passed to the function
  return config.defaultLocale;
});
