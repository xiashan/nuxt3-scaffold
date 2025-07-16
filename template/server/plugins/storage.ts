/*
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-05-07 10:12:00
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-16 19:53:39
 * @FilePath: /nuxt3-scaffold/template/server/plugins/storage.ts
 * @Description:
 */
import redisDriver from "unstorage/drivers/redis";
export default defineNitroPlugin(() => {
  const storage = useStorage();
  // Dynamically pass in credentials from runtime configuration, or other sources
  const driver = redisDriver({
    db: 6,
    base: "miniwork:",
    host: useRuntimeConfig().private.redis.host,
    password: useRuntimeConfig().private.redis.password,
    /* other redis connector options */
  });

  // Mount driver
  storage.mount("redis", driver);
});
