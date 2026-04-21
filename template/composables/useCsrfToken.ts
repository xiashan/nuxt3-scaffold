import { computed } from "vue";
import { useCookie } from "#app";
import { CSRF_COOKIE_NAME } from "~/constants/security";

export const useCsrfToken = () => {
  const cookie = useCookie<string | null>(CSRF_COOKIE_NAME);
  return computed(() => cookie.value || "");
};
