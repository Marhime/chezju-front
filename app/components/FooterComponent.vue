<script lang="ts" setup>
import type { Content } from "@prismicio/client";
const app = useNuxtApp();
const data = app.$settings as Content.SettingsDocumentData;
</script>

<template>
  <footer class="bg-primary w-full">
    <div class="bg-primary p-6 2xl:px-12 pt-14 lg:pt-24">
      <ul
        class="flex flex-col gap-8 items-center lg:flex-row lg:gap-20 lg:justify-center"
      >
        <li v-for="link in data?.navItems" :key="link.key">
          <PrismicLink
            :field="link"
            class="text-light hover:text-light/80 uppercase font-black text-3xl"
          >
            {{ link.text }}
          </PrismicLink>
        </li>
        <li>
          <a
            class="inline-block px-4 py-2.5 bg-light hover:bg-light/80 rounded-sm text-3xl transition uppercase font-primary font-extrabold text-primary"
            :href="data?.click_collect_url || ''"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ "Commander" }}
          </a>
        </li>
      </ul>
      <ul
        class="flex flex-col gap-8 lg:my-20 lg:flex-row lg:gap-20 text-center mt-16 text-light lg:justify-center"
      >
        <li class="flex flex-col items-center gap-2 lg:max-w-48">
          <p>NOUS TROUVER</p>
          <p class="font-bold">
            {{ data?.address }}
          </p>
        </li>
        <li class="flex flex-col items-center">
          <p class="mb-2">NOUS CONTACTER</p>
          <NuxtLink
            href="tel:{{ data?.phone }}"
            class="text-light hover:text-light/80 font-bold"
          >
            {{ data?.phone }}
          </NuxtLink>
          <NuxtLink
            :to="`mailto:${data?.email}`"
            class="text-light hover:text-light/80 font-bold"
          >
            {{ data?.email }}
          </NuxtLink>
        </li>
        <li class="flex flex-col items-center gap-2">
          <p>NOUS SUIVRE</p>
          <ul>
            <li v-for="(item, index) in data.social_links" :key="index">
              <PrismicLink :field="item.link" class="block">
                <NuxtImg
                  v-if="item.logo.url"
                  :src="item.logo.url"
                  preset="prismicImage"
                  :alt="item.logo.alt || 'Logo'"
                  class="h-8 xl:h-10"
                />
              </PrismicLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="bg-primary text-light text-center pb-4">
      <p class="text-xs md:text-sm">
        © {{ new Date().getFullYear() }} Chez Ju. Tous droits réservés.
        <span class="block md:inline"
          >Site réalisé par
          <a
            class="hover:text-light/80"
            href="contact@marhi.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            marhime.</a
          >
        </span>
      </p>
    </div>
  </footer>
</template>

<style></style>
