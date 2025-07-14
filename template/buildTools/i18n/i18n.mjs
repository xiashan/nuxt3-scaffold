/*
 * @Author: lishaonan lishaonan@noxgroup.com
 * @Date: 2025-03-20 16:23:23
 * @LastEditors: lishaonan lishaonan@noxgroup.com
 * @LastEditTime: 2025-06-12 20:03:33
 * @FilePath: /ai-robot/buildTools/i18n/i18n.mjs
 * @Description:
 *
 * Copyright (c) 2025 by NoxGroup, All Rights Reserved.
 */
import fs from "fs";
import { fileURLToPath } from "node:url";
import xlsx from "node-xlsx";
import { dirname, join } from "node:path";
// import JSYAML from "js-yaml";
const localeMap = {};
const localeIndexMap = {};
// 获取 __filename 的 ESM 写法
// const __filename = fileURLToPath(import.meta.url);
// 获取 __dirname 的 ESM 写法
const __dirname = dirname(fileURLToPath(import.meta.url));
// 读取 locale.xlsx 文件
const workSheetsFromFile = xlsx.parse(`${__dirname}/Miniwork国际化文案.xlsx`);
const sheet = workSheetsFromFile[0];
const data = sheet.data;
const localeList = ["en", "zh-CN", "zh-TW", "ko", "de", "fr", "es", "pt"];
// 获取列头
const headers = data[0];
// const enIndex = headers.indexOf("en");
// const zhIndex = headers.indexOf("zh-CN");

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

// // 写入 en.json 和 zh.json 文件
// fs.writeFileSync(
//   join(__dirname, `../../i18n/locales/en.json`),
//   JSON.stringify(en, null, 2),
// );
// fs.writeFileSync(
//   join(__dirname, `../../i18n/locales/zh-CN.json`),
//   JSON.stringify(zh, null, 2),
// );
