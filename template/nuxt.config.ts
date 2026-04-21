// https://nuxt.com/docs/api/configuration/nuxt-config
const ALLOWED_CORS_ORIGINS: string[] = [
  "https://kflx.ai",
  "https://www.kflx.ai",
  "https://huidu.kflx.ai/",
  "http://127.0.0.1:3435",
  "http://localhost:3435",
];

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
  routeRules: {
    "/**": {
      headers: {
        "Content-Security-Policy": "frame-ancestors 'self'",
        "X-Frame-Options": "SAMEORIGIN",
      },
    },
  },
  features: {
    inlineStyles: () => {
      return false;
    },
  },
  experimental: {
    appManifest: false,
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
        clientId: "your client id",
        clientSecret: "your client secret",
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
    },
    security: {
      allowOptionsMethod: process.env.NUXT_SECURITY_ALLOW_OPTIONS === "true",
    },
    public: {
      csrfCookieName: "",
    },
    session: {
      maxAge: 60 * 60 * 24 * 365,
      // maxAge: 60,
      name: "scaffold-session",
      password: process.env.NUXT_SESSION_PASSWORD || "",
      cookie: {
        sameSite: "lax",
        domain: process.env.NODE_ENV === "development" ? "" : ".miniwork.ai",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  css: ["@/assets/css/main.css"],
  compatibilityDate: "2026-04-21",
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
  ],
  gtag: {
    id: "your gtag id",
  },
  googleSignIn: {
    clientId: "your client id",
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
      cors: {
        origin: ALLOWED_CORS_ORIGINS,
        credentials: true,
      },
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
