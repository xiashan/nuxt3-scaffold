/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-06-03 10:11:33
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-16 19:51:35
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
        NUXT_PRIVATE_PROXY_TARGET: "http://api.com",
        NUXT_SESSION_PASSWORD: "a358ff7a75604c2c8b7c7a138dbeb12b",
        NUXT_SESSION_COOKIE_SECURE: false,
        NUXT_SESSION_COOKIE_DOMAIN: "",
        NUXT_PRIVATE_REDIS_HOST: "",
        NUXT_PRIVATE_REDIS_PASSWORD: "",
      },
    },
  ],
};
