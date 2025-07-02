<script setup lang="ts">
import { isFilled, type Content } from "@prismicio/client";

const app = useNuxtApp();
const data = app.$settings as Content.SettingsDocumentData;

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const { slice } = defineProps(
  getSliceComponentProps<Content.InfoSectionSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="py-14 xl:py-20 max-w-[1440px] mx-auto bg-secondary px-6 xl:px-12 my-10"
  >
    <div class="xl:grid xl:grid-cols-2 xl:gap-[200px] items-center">
      <div class="flex flex-col">
        <h2
          class="font-serif font-extrabold m-heading-xl text-light leading-tight"
        >
          {{ slice.primary.title }}
        </h2>
        <p class="text-light text-lg mt-15">
          {{ slice.primary.paragraphe_1 }}
        </p>
        <p class="text-light text-lg mt-10">
          {{ slice.primary.paragraphe_2 }}
        </p>
      </div>
      <div class="flex flex-col">
        <div class="flex flex-col gap-5 mt-10 xl:mt-0 xl:gap-20">
          <div
            v-for="(item, index) in slice.primary.items"
            :key="index"
            class="flex items-start gap-4"
          >
            <NuxtImg
              v-if="item.icon.url"
              :src="item.icon.url"
              :alt="item.icon.alt || `Icone ${item.title}`"
              class="w-11 mt-2"
            />
            <div>
              <p class="text-light text-2xl font-bold">{{ item.title }}</p>
              <p class="text-light text-lg mt-2 xl:max-w-[335px]">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-20">
      <PrismicLink
        v-if="isFilled.link(slice.primary.cta)"
        :field="slice.primary.cta"
        class="inline-block px-4 py-2.5 bg-light rounded-sm text-lg transition uppercase font-black text-secondary"
      >
        {{ slice.primary.cta.text }}
      </PrismicLink>
      <a
        v-else
        :href="data?.click_collect_url || ''"
        class="inline-block px-4 py-2.5 bg-light rounded-sm text-lg transition uppercase font-black text-secondary"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ slice.primary.cta?.text || "Commander" }}
      </a>
    </div>
  </section>
</template>
