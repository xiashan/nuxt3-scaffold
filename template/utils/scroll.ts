/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-05-14 17:48:00
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-16 19:44:40
 * @FilePath: /nuxt3-scaffold/template/utils/scroll.ts
 * @Description:
 */
import { isRef } from "vue";
export const scrollToBottom = (item: HTMLElement | Ref<HTMLElement | null>) => {
  const itemElement = isRef(item) ? item.value : item;
  if (itemElement) {
    itemElement.scrollTop = itemElement.scrollHeight;
  }
};
