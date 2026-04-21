/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-03-25 14:01:09
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-21 10:27:48
 * @FilePath: /ai-robot/plugins/markdown.ts
 * @Description:
 */
import { defineNuxtPlugin } from "#app";

import mdit from "markdown-it";

const markdownit = new mdit({
  html: true,
  xhtmlOut: false,
  breaks: true,
  langPrefix: "language-",
  linkify: true,
  typographer: true,
  quotes: "“”‘’",
});

markdownit.linkify.set({ fuzzyEmail: false });

export default defineNuxtPlugin(() => {
  return {
    provide: {
      mdit: markdownit,
    },
  };
});
