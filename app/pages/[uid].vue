<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();
const route = useRoute();
const { data: page } = await useAsyncData(route.params.uid as string, () =>
  prismic.client.getByUID("page", route.params.uid as string)
);

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
  });
}

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
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Restaurant",
        name: "Chez Ju'",
        image: "https://tonsite.com/og-image.jpg",
        address: {
          "@type": "PostalAddress",
          streetAddress: "123 Rue des Légumes",
          addressLocality: "Paris",
          postalCode: "75008",
          addressCountry: "FR",
        },
        telephone: "+33 1 23 45 67 89",
        servesCuisine: ["Salades", "Végétarien", "Bio"],
        url: "https://tonsite.com",
        priceRange: "€",
        openingHours: ["Mo-Fr 11:00-15:00", "Sa 11:00-14:00"],
        sameAs: ["https://www.instagram.com/chezjuparis"],
      }),
    },
  ],
});
</script>

<template>
  <SliceZone
    wrapper="main"
    :slices="page?.data.slices ?? []"
    :components="components"
  />
</template>
