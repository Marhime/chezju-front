<script setup lang="ts">
import { NuxtImg } from "#components"; // important pour auto-import

import type { Content } from "@prismicio/client";

const { slice } = defineProps(
  getSliceComponentProps<Content.HeroHeaderSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<template>
  <section
    class="hero-header flex flex-col justify-center items-center text-center px-2 relative min-h-[80vh] xl:min-h-[calc(100vh-5rem)] 2xl:min-h-[80vh]"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <NuxtImg
      v-if="slice.primary.image.url"
      :src="slice.primary.image.url"
      preset="prismicImage"
      :alt="slice.primary.image.alt || 'Hero image'"
      class="absolute top-0 left-0 w-full h-full object-cover"
    />
    <div class="overlay absolute inset-0 bg-dark opacity-20" />
    <div class="relative text-light">
      <h1 class="mb-4 m-heading-xl max-w-[1033px] leading-[1.2] font-black">
        {{ slice.primary.title }}
      </h1>

      <div
        class="flex flex-col md:flex-row items-center justify-center gap-4 mt-6 md:mt-5"
      >
        <p
          class="md:block text-sm md:text-lg text-foreground uppercase font-black"
        >
          {{ slice.primary.before_cta }}
        </p>

        <PrismicLink
          :field="slice.primary.cta"
          class="inline-block px-4 py-2.5 bg-primary rounded-sm text-lg transition uppercase font-black"
        >
          {{ slice.primary.cta?.text || "Commander" }}
        </PrismicLink>
      </div>
    </div>
  </section>
</template>
