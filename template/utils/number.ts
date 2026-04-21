/*
 * @Author: xiashan
 * @Date: 2025-05-20 16:40:42
 * @LastEditors:
 * @LastEditTime: 2026-04-21 11:12:58
 * @Description:
 */
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

export const numberToUnit = (
  value: number,
  digits = 2,
  unit: "compact" | "standard" | "scientific" | "engineering" = "compact",
) => {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: unit,
    maximumFractionDigits: digits,
    style: "decimal", // 小数点后全是0不显示
  });
  return formatter.format(value);
};
