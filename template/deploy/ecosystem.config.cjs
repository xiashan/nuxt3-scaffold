/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-06-03 10:48:50
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-16 19:51:31
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
        NUXT_PRIVATE_PROXY_TARGET: "http://api.com",
        NUXT_SESSION_PASSWORD: "974df470ec11459baecc072b76e44080",
        NUXT_SESSION_COOKIE_SECURE: false,
        NUXT_PRIVATE_REDIS_HOST: "",
        NUXT_PRIVATE_REDIS_PASSWORD: "",
      },
      env_test: {
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
