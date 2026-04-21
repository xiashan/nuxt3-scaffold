export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:response", (response) => {
    if (response.headers?.server) {
      delete response.headers.server;
    }
    if (response.headers?.["x-powered-by"]) {
      delete response.headers["x-powered-by"];
    }
  });
});
