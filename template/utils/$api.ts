/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-06-16 15:25:05
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-18 11:18:16
 * @FilePath: /nuxt3-scaffold/template/utils/$api.ts
 * @Description:
 */
function api(url: string, options: any) {
  const nuxtApp = useNuxtApp();
  const locale = nuxtApp.$i18n.locale.value;
  options = options || {};
  options.headers = {
    ...options.headers,
    locale: locale === "zh-CN" ? "zh" : locale,
  };
  if (import.meta.client) {
    return $fetch(url, options);
  } else if (import.meta.server) {
    return useNuxtApp().ssrContext?.event.$fetch(url, options);
  }
}

export const $api = api as typeof $fetch;
