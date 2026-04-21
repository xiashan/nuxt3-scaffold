/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-05-08 14:01:23
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-28 17:27:38
 * @FilePath: /frontend/plugins/dompurify-html.ts
 * @Description:
 */
import VueDOMPurifyHTML from "vue-dompurify-html";
import DOMPurify from "isomorphic-dompurify";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    VueDOMPurifyHTML,
    {
      namedConfigurations: {
        plaintext: {
          USE_PROFILES: { html: false },
        },
      },
      enableSSRPropsSupport: true,
      hooks: {
        afterSanitizeAttributes: (node: HTMLElement) => {
          // Do something with the node
          if ("target" in node) {
            node.setAttribute("target", "_blank");
            node.setAttribute("rel", "noopener");
          }
        },
      },
    },
    () => DOMPurify,
  );
});
