/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-06-03 10:11:33
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-18 14:26:57
 * @FilePath: /nuxt3-scaffold/template/deploy/ecosystem.test.config.cjs
 * @Description:
 */
module.exports = {
  apps: [
    {
      script: ".output/server/index.mjs",
      port: "3435",
      env: {
        CONFIG_ENV: "test",
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
