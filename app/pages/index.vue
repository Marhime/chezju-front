<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();
const { data: page } = await useAsyncData("index", () =>
  prismic.client.getByUID("page", "home")
);

useHead({
  title: page.value?.data.title_seo,
  meta: [
    {
      name: "description",
      content: page.value?.data.description_seo,
    },
    {
      property: "og:title",
      content: page.value?.data.title_seo,
    },
    {
      property: "og:description",
      content: page.value?.data.description_seo,
    },
    {
      property: "og:image",
      content:
        page.value?.data.image_seo?.url || "/chez-ju-bar-a-salade-paris-8.jpg",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "apple-mobile-web-app-title",
      content: "Chez Ju'",
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon-96x96.png",
      sizes: "96x96",
    },
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/favicon.svg",
    },
    {
      rel: "shortcut icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ],
});

definePageMeta({
  layout: "default", // Utilisation du layout 'default'
});
</script>

<template>
  <SliceZone
    wrapper="main"
    :slices="page?.data.slices ?? []"
    :components="components"
  />
</template>
