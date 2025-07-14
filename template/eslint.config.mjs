/*
 * @Author: lishaonan lishaonan@noxgroup.com
 * @Date: 2025-03-17 20:15:53
 * @LastEditors: lishaonan lishaonan@noxgroup.com
 * @LastEditTime: 2025-03-28 11:10:18
 * @FilePath: /ai-robot/eslint.config.mjs
 * @Description:
 *
 * Copyright (c) 2025 by NoxGroup, All Rights Reserved.
 */
// @ts-check
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(eslintPluginPrettierRecommended, {
  rules: {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "all",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "vue/no-unused-vars": [
      "error",
      {
        ignorePattern: "^_",
      },
    ],
  },
});
