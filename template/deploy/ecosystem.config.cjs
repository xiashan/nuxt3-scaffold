/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-06-03 10:48:50
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-18 14:26:28
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
        NUXT_PRIVATE_REDIS_HOST: "",
        NUXT_SESSION_COOKIE_SECURE: false,
        NUXT_PRIVATE_REDIS_PASSWORD: "",
        NUXT_PRIVATE_CAS_BASE_URL: "",
        NUXT_PRIVATE_CAS_CLIENT_ID: "",
        NUXT_PRIVATE_CAS_CLIENT_SECRET: "",
      },
      env_test: {
        NUXT_PRIVATE_PROXY_TARGET: "",
        NUXT_SESSION_PASSWORD: "",
        NUXT_PRIVATE_REDIS_HOST: "",
        NUXT_SESSION_COOKIE_SECURE: false,
        NUXT_PRIVATE_REDIS_PASSWORD: "",
        NUXT_PRIVATE_CAS_BASE_URL: "",
        NUXT_PRIVATE_CAS_CLIENT_ID: "",
        NUXT_PRIVATE_CAS_CLIENT_SECRET: "",
      },
    },
  ],
};
