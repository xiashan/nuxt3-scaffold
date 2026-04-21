/*
 * @Author: xiashan
 * @Date: 2025-12-22 16:12:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-12-29 11:07:34
 * @Description: 用于SSR的请求
 */
function serverApi(url: string, options: any) {
  const nuxtApp = useNuxtApp();
  let locale = nuxtApp.$i18n.locale.value;
  if (locale === "zh-CN") {
    locale = "zh" as any;
  }
  options = options || {};
  options.headers = {
    ...options.headers,
    locale: locale,
  };
  if (import.meta.client) {
    return $fetch(url, options);
  } else if (import.meta.server) {
    return useNuxtApp().ssrContext?.event.$fetch(url, options);
  }
}

export const $serverApi = serverApi as typeof $fetch;
