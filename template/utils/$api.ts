/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-06-16 15:25:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2026-04-21 14:56:09
 * @FilePath: /ai-kairo/frontend/utils/$api.ts
 * @Description:
 */
import type { $Fetch, FetchOptions } from "ofetch";
import { useCookie } from "#app";
import { CSRF_COOKIE_NAME, CSRF_HEADER_NAME } from "~/constants/security";

type ApiFetch = $Fetch;

const resolveApiInstance = (): ApiFetch => {
  return useNuxtApp().$api as ApiFetch;
};

const shouldCleanParams = (options?: FetchOptions) => {
  const method = options?.method ?? "GET";
  return String(method).toUpperCase() === "GET";
};

const removeEmptyValues = (params?: FetchOptions["query"]) => {
  if (!params || typeof params !== "object") return;
  const cleaned = Object.fromEntries(
    Object.entries(params).filter(
      ([, v]) => v !== null && v !== undefined && v !== "",
    ),
  );
  Object.keys(params).forEach((key) => {
    (params as Record<string, unknown>)[key] = cleaned[key];
  });
  Object.keys(params).forEach((key) => {
    if (!(key in cleaned)) {
      (params as Record<string, unknown>)[key] = undefined;
    }
  });
};

const preprocessGetParams = (options?: FetchOptions) => {
  if (!options || !shouldCleanParams(options)) return;
  if (options.query) {
    removeEmptyValues(options.query);
  }
};

const resolveCsrfToken = () => {
  try {
    const csrfCookie = useCookie<string | null>(CSRF_COOKIE_NAME);
    return csrfCookie.value || "";
  } catch {
    return "";
  }
};

const applySecurityHeaders = (options?: FetchOptions) => {
  if (!options) return;
  const headers = new Headers(options.headers as HeadersInit | undefined);
  const csrfToken = resolveCsrfToken();
  if (csrfToken && !headers.has(CSRF_HEADER_NAME)) {
    headers.set(CSRF_HEADER_NAME, csrfToken);
  }
  if (!headers.has("X-Requested-With")) {
    headers.set("X-Requested-With", "XMLHttpRequest");
  }
  options.headers = Object.fromEntries(headers.entries());
  if (!options.credentials) {
    options.credentials = "same-origin";
  }
};

export const $api = new Proxy(function () {} as unknown as ApiFetch, {
  apply(_target, _thisArg, argArray: Parameters<ApiFetch>) {
    const [input] = argArray;
    const init = (argArray[1] ||= {});
    preprocessGetParams(init as FetchOptions);
    applySecurityHeaders(init as FetchOptions);
    return resolveApiInstance()(input, init);
  },
  get(_target, prop: keyof ApiFetch | symbol) {
    const instance = resolveApiInstance() as unknown as Record<
      string | symbol,
      unknown
    >;
    const value = instance[prop];
    return typeof value === "function"
      ? (value as (...args: unknown[]) => unknown).bind(instance)
      : value;
  },
}) as ApiFetch;
