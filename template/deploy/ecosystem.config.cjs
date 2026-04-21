/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-06-03 10:48:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2026-04-21 10:42:09
 * @FilePath: /nuxt3-scaffold/template/deploy/ecosystem.config.cjs
 * @Description:
 */
module.exports = {
  apps: [
    {
      name: "Nuxt3-Scaffold",
      port: "3435",
      exec_mode: "cluster",
      instances: 4,
      script: ".output/server/index.mjs",
      env: {
        CONFIG_ENV: "production",
        NUXT_PRIVATE_PROXY_TARGET: "",
        NUXT_SESSION_PASSWORD: "",
        NUXT_SESSION_COOKIE_SECURE: false,
        NUXT_PRIVATE_CAS_BASE_URL: "",
        NUXT_PRIVATE_CAS_CLIENT_ID: "",
        NUXT_PRIVATE_CAS_CLIENT_SECRET: "",
      },
      env_pre: {
        CONFIG_ENV: "preview",
        NUXT_PRIVATE_PROXY_TARGET: "",
        NUXT_SESSION_PASSWORD: "",
        NUXT_SESSION_COOKIE_SECURE: false,
        NUXT_PRIVATE_CAS_BASE_URL: "",
        NUXT_PRIVATE_CAS_CLIENT_ID: "",
        NUXT_PRIVATE_CAS_CLIENT_SECRET: "",
      },
    },
  ],
};
