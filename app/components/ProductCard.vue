<script setup lang="ts">
import type { Content } from "@prismicio/client";

// Props
defineProps<{
  product: Content.ProductDocument;
}>();
const app = useNuxtApp();
const settings = app.$settings as Content.SettingsDocumentData;
</script>

<template>
  <div class="product-card">
    <NuxtImg
      v-if="product.data.image.url"
      :src="product.data.image.url"
      preset="prismicImage"
      :alt="product.data.image.alt || 'Hero image'"
      class="w-full object-cover h-[345px] mb-4 rounded-sm"
    />
    <h3 class="font-serif uppercase text-xl font-extrabold text-secondary mb-1">
      {{ product.data.name }}
    </h3>
    <p class="text-sm text-gray-500 line-clamp-4">
      {{ (product.data.description?.[0] as any)?.text || "" }}
    </p>
    <div class="mt-5 flex flex-wrap items-center gap-2">
      <p
        v-for="(item, index) in product.data.items"
        :key="index"
        class="text-lg font-light font-serif uppercase"
      >
        {{ item.text }}
      </p>
    </div>
    <a
      v-if="settings.click_collect_url"
      :href="settings.click_collect_url"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-block text-primary text-lg transition uppercase font-black mt-5"
    >
      Commander
    </a>
  </div>
</template>
