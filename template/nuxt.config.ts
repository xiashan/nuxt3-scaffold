// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Scaffold",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      meta: [
        {
          name: "viewport",
          content: "width=720,user-scalable=1",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  nitro: {
    experimental: {
      websocket: true,
    },
  },
  features: {
    inlineStyles: () => {
      return false;
    },
  },
  devServer: {
    port: 3435,
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    oauth: {
      google: {
        clientId:
          "1010482379297-q7jp0g0jouu7aldm5g76ndsf45lkm1s6.apps.googleusercontent.com",
        clientSecret: "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",
      },
    },
    private: {
      proxy: {
        target: "",
      },
      cas: {
        baseURL: "",
        clientId: "",
        clientSecret: "",
      },
      redis: {
        host: "",
        password: "",
      },
    },
    session: {
      maxAge: 60 * 60 * 24 * 7,
      // maxAge: 60,
      name: "scaffold-session",
      password: "",
      cookie: {
        sameSite: "lax",
        domain: process.env.NODE_ENV === "development" ? "" : ".miniwork.ai",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  css: [
    "@/assets/css/main.css",
  ],
  compatibilityDate: "2025-07-14",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxt/eslint",
    "@element-plus/nuxt",
    "nuxt-auth-utils",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "@formkit/auto-animate/nuxt",
    "nuxt-gtag",
    "pinia-plugin-persistedstate",
    "nuxt-vue3-google-signin",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
  ],
  gtag: {
    id: "G-TKS3MGXWTH",
  },
  googleSignIn: {
    clientId:
      "1010482379297-q7jp0g0jouu7aldm5g76ndsf45lkm1s6.apps.googleusercontent.com",
  },
  piniaPluginPersistedstate: {
    // @ts-expect-error key 配置中不提示，请忽略，不要删除
    key: "pinia_%id",
  },
  pinia: {
    storesDirs: ["stores"],
  },
  vite: {
    server: {
      allowedHosts: [".miniwork.ai"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/css/override/elementPlus.scss";
          `,
        },
      },
    },
  },
  elementPlus: {
    themes: ["dark"],
    importStyle: "scss",
    icon: "ElIcon",
    injectionID: { prefix: 100, current: 1 },
    globalConfig: { size: "default", zIndex: 1000 },
  },
  sitemap: {
    sources: ["/api/__sitemap__/urls"],
    exclude: ["/test", "/test/**", "/ws"],
  },
  robots: {
    // disallow: ["/console/"],
  },
  i18n: {
    compilation: {
      strictMessage: false,
    },
    experimental: {
      localeDetector: "localeDetector.ts",
    },
    // detectBrowserLanguage: false,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },

    baseUrl: "https://miniwork.ai",
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        language: "en-US",
        file: "en.json",
      },
      {
        code: "zh-CN",
        language: "zh-CN",
        file: "zh-CN.json",
      },
    ],
    strategy: "prefix",
    vueI18n: "./i18n.config.ts",
  },
});
