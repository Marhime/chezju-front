import tailwindcss from "@tailwindcss/vite";
import { repositoryName } from "./slicemachine.config.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: process.env.NODE_ENV === "development" },

  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "Chez Ju | Salade sur mesure",
      htmlAttrs: {
        lang: "fr",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { key: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) =>
        ["swiper-container", "swiper-slide"].includes(tag),
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxtjs/prismic",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
  ],

  prismic: {
    endpoint: repositoryName,
    preview: "/api/preview",
    clientConfig: {
      routes: [
        {
          type: "page",
          path: "/:uid",
        },
        {
          type: "page",
          uid: "home",
          path: "/",
        },
      ],
    },
  },

  image: {
    providers: {
      prismic: {
        name: "imgix",
        provider: "imgix",
        options: {
          domains: ["images.prismic.io"],
        },
      },
    },
    presets: {
      prismicImage: {
        provider: "prismic",
        modifiers: {
          auto: "format,compress",
          fit: "max",
        },
      },
    },
  },

  googleFonts: {
    families: {
      Montserrat: [200, 400, 500, 600, 700, 800, 900],
      Poppins: [400, 500, 600, 700, 800, 900],
    },
    display: "swap",
    preconnect: true,
    preload: true,
  },

  site: {
    url: "chezju.restaurant",
    name: "Chez Ju' | Bar à Salades Paris 8ème",
  },

  compatibilityDate: "2025-01-06",
});
