/*
 * @Author: Codex AI 助手
 * @Date: 2025-02-17 00:00:00
 * @Description: 创建并注册 $api 的底层 $fetch 实例（nuxtApp.$api），统一处理
 * - 请求拦截：注入 locale header
 * - 响应拦截：业务 code 非 0 时弹错误提示
 * - 响应错误拦截：处理 401 唤起登录弹窗、特殊错误码（品牌洞察库权限）、抛出标准化错误
 */
import { createError } from "h3";
import { ElMessage } from "element-plus";
import { $fetch } from "ofetch";
import type { FetchContext, FetchError, FetchResponse } from "ofetch";
import type { Ref } from "vue";
import { useAuthStore } from "~/stores/auth";

const DEFAULT_ERROR_MESSAGE = "网络错误，请稍后再试";

type ApiResponsePayload = {
  code?: number;
  msg?: string;
  data?: unknown;
  dataList?: unknown;
};

export default defineNuxtPlugin((nuxtApp) => {
  const resolveLocaleHeader = () => {
    const i18n = nuxtApp.$i18n as { locale?: Ref<string> };
    const locale = i18n?.locale?.value;
    if (!locale) return undefined;
    return locale === "zh-CN" ? "zh" : locale;
  };

  const showClientError = (message: string) => {
    if (import.meta.client) {
      ElMessage.error(message || DEFAULT_ERROR_MESSAGE);
    }
  };

  const apiInstance = $fetch.create({
    baseURL: "/",
    credentials: "include",
    retry: 0,
    async onRequest({ options }: FetchContext) {
      const locale = resolveLocaleHeader();
      if (locale) {
        const headers = new Headers(options.headers || {});
        headers.set("locale", locale);
        options.headers = headers;
      }
    },
    async onResponse({
      response,
    }: FetchContext & { response: FetchResponse<ApiResponsePayload> }) {
      const payload = response._data;
      if (
        response?.status === 200 &&
        payload &&
        typeof payload === "object" &&
        Object.prototype.hasOwnProperty.call(payload, "code") &&
        payload.code !== undefined &&
        payload.code !== 0
      ) {
        const message = payload.msg;
        if (import.meta.client && message) {
          showClientError(message);
        } else {
          console.error(`[API] 业务异常: ${response.url} -> ${message}`);
        }
        // 预留业务处理code的情况
        // throw createError({
        //   statusCode: 200,
        //   statusMessage: message,
        //   data: payload,
        // });
      }
    },
    onResponseError({
      response,
      error,
    }: FetchContext & {
      response?: FetchResponse<ApiResponsePayload>;
      error?: FetchError<ApiResponsePayload>;
    }) {
      const status = response?.status ?? error?.statusCode ?? 0;
      let message =
        response?._data?.msg ||
        error?.data?.msg ||
        error?.message ||
        DEFAULT_ERROR_MESSAGE;

      if (status === 401 && import.meta.client) {
        try {
          const authStore = useAuthStore();
          authStore.isAuthModalShow = true;
          message = "登录状态已过期，请重新登录";
        } catch (storeError) {
          console.warn("[API] 无法唤起登录弹窗:", storeError);
        }
      }

      if (import.meta.client) {
        showClientError(message);
      } else {
        console.error(
          `[API] 请求异常: ${response?.url ?? "unknown"} -> ${message}`,
        );
      }

      throw (
        error ??
        createError({
          statusCode: status || 500,
          statusMessage: message,
        })
      );
    },
  });

  nuxtApp.provide("api", apiInstance);
});
