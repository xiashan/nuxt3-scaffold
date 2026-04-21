/*
 * @Author: xiashan
 * @Date: 2025-12-19 18:05:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2026-04-21 15:21:55
 * @Description:
 */
const config = useRuntimeConfig();

export const CSRF_COOKIE_NAME = config.public.csrfCookieName as string;
export const CSRF_HEADER_NAME = "x-csrf-token";
