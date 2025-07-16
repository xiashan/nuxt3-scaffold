export default defineNuxtPlugin((context) => {
  const i18n = context.$i18n as any;
  const route = useRoute();
  const routeQueryLang = route.query.lang || "";
  // Check if the `locale` query parameter is present and different from the current locale
  if (routeQueryLang && routeQueryLang !== i18n.locale.value) {
    // If the `locale` value is valid, set the locale to the new value
    if (i18n.localeCodes.value.includes(routeQueryLang)) {
      i18n.locale.value = routeQueryLang;
    } else {
      // If the `locale` value is not valid, set the locale to the default locale
      i18n.locale.value = i18n.defaultLocale;
    }
  }
});
