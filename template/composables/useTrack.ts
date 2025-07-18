/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-05-28 16:06:55
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-18 10:55:31
 * @FilePath: /nuxt3-scaffold/template/composables/useTrack.ts
 * @Description:
 */
const StorageKey = "k-track-event";
interface IStorageValue {
  eventName: string;
  eventParams: object;
}
const trackEvent = (
  eventName: string,
  eventParams: object,
  options?: {
    delay?: boolean;
  },
) => {
  if (options?.delay) {
    const list = useSessionStorage<IStorageValue[]>(StorageKey, []);
    list.value.push({
      eventName,
      eventParams,
    });
    return;
  }
  useTrackEvent(eventName, eventParams);
};
const initTrack = () => {
  const list = useSessionStorage<IStorageValue[]>(StorageKey, []);
  list.value.forEach((item) => {
    useTrackEvent(item.eventName, item.eventParams);
  });
  list.value = [];
};
export const useTrack = () => {
  return {
    initTrack,
    trackEvent,
  };
};
