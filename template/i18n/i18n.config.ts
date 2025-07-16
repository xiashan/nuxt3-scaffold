/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-07-14 10:07:11
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-16 19:36:30
 * @FilePath: /nuxt3-scaffold/template/i18n/i18n.config.ts
 * @Description:
 */
export default defineI18nConfig(() => ({
  legacy: false,

  messageResolver: (obj: any, path) => {
    // simple message resolving!
    const msg = obj[path];
    return msg != null ? msg : null;
  },
}));
