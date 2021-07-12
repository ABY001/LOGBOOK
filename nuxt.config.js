export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Online Logbook",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&display=swap"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["ant-design-vue/dist/antd.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "@/plugins/antd-ui" },
    { src: "~/plugins/axios" },
    { src: "~/plugins/persistedState.client.js" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // axios: {
  //   baseURL:
  //     process.env.NODE_ENV === "production"
  //       ? process.env.BASE_URL
  //       : `https://logbook-backend.herokuapp.com`
  // },

  // auth: {
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: {
  //           url: "/api/v1/supervisors/login",
  //           method: "post"
  //         },
  //         // logout: { url: "/api/v1/admin/logout", method: "put" },
  //         user: false
  //       }
  //       // tokenType: ""
  //     }
  //   }
  // },

  // Modules: https://go.nuxtjs.dev/config-modules

  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next"],

  // router: {
  //   middleware: ["auth"]
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
