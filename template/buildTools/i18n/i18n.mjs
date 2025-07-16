/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-07-14 10:03:29
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-16 18:54:40
 * @FilePath: /nuxt3-scaffold/template/buildTools/i18n/i18n.mjs
 * @Description:
 */
import fs from "fs";
import { fileURLToPath } from "node:url";
import xlsx from "node-xlsx";
import { dirname, join } from "node:path";
const localeMap = {};
const localeIndexMap = {};
const __dirname = dirname(fileURLToPath(import.meta.url));
// 读取 locale.xlsx 文件
const workSheetsFromFile = xlsx.parse(`${__dirname}/文案.xlsx`);
const sheet = workSheetsFromFile[0];
const data = sheet.data;
const localeList = ["en", "zh-CN"];
// 获取列头
const headers = data[0];

localeList.forEach((locale) => {
  const localeIndex = headers.indexOf(locale);
  if (localeIndex === -1) {
    throw new Error(`Excel 文件中必须包含 ${locale} 列`);
  }
  localeMap[locale] = {};
  localeIndexMap[locale] = localeIndex;
});

// 遍历数据并填充对象
for (let i = 1; i < data.length; i++) {
  const row = data[i];
  let key = row[0];
  if (!key) continue;
  key = key.trim();
  localeList.forEach((locale) => {
    localeMap[locale][key] = row[localeIndexMap[locale]] || "";
  });
}

localeList.forEach((locale) => {
  fs.writeFileSync(
    join(__dirname, `../../i18n/locales/${locale}.json`),
    JSON.stringify(localeMap[locale], null, 2),
  );
});
