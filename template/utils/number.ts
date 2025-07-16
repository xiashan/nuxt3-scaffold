export const toFixed = (value: number, digits: number) => {
  return Number(value.toFixed(digits));
};

export const toPercent = (value: number, digits: number) => {
  const formatPercent = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  });
  return formatPercent.format(value);
};

export const numberToUnit = (value: number) => {
  const nuxtApp = useNuxtApp();
  const formatter = new Intl.NumberFormat(nuxtApp.$i18n.locale.value, {
    notation: "compact",
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
};
