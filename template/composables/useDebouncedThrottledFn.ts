/*
 * @Author: xiashan
 * @Date: 2026-03-09 13:35:53
 * @LastEditors:
 * @LastEditTime: 2026-03-24 15:22:00
 * @Description:
 */
/*
 * @Author: auto-generated
 * @Description: 通用防抖 + 节流封装，便于跨模块复用
 */
import { useDebounceFn, useThrottleFn } from "@vueuse/core";
import type { DebounceFilterOptions } from "@vueuse/shared";

export interface UseDebouncedThrottledOptions {
  debounce?: number;
  debounceOptions?: DebounceFilterOptions;
  throttle?: number;
  throttleTrailing?: boolean;
  throttleLeading?: boolean;
  throttleRejectOnCancel?: boolean;
}

export const useDebouncedThrottledFn = <T extends (...args: any[]) => any>(
  fn: T,
  options: UseDebouncedThrottledOptions = {},
) => {
  const {
    debounce = 300,
    debounceOptions,
    throttle = 1000,
    throttleTrailing = true,
    throttleLeading = true,
    throttleRejectOnCancel = false,
  } = options;

  const throttled =
    throttle > 0
      ? useThrottleFn(
          fn,
          throttle,
          throttleTrailing,
          throttleLeading,
          throttleRejectOnCancel,
        )
      : fn;

  if (debounce <= 0) {
    return throttled;
  }

  return useDebounceFn(
    (...args: Parameters<T>) => throttled(...args),
    debounce,
    debounceOptions,
  );
};
