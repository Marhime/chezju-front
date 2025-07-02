<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const { slice } = defineProps(
  getSliceComponentProps<Content.TextImageSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<template>
  <div
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="px-6 lg:px-12 py-10 max-w-[1440px] mx-auto"
  >
    <div
      :class="`lg:flex lg:gap-10 xl:gap-20 2xl:gap-30 justify-between items-center ${slice.primary.image_left ? 'flex-row-reverse' : 'flex-row'}`"
    >
      <div class="w-full lg:w-3/5 flex flex-col justify-center">
        <h3
          class="font-serif font-extrabold m-heading-xl leading-[1.2] text-primary"
        >
          {{ slice.primary.title }}
        </h3>
        <p class="text-2xl font-bold mt-3 leading-none text-secondary">
          {{ slice.primary.subtitle }}
        </p>
        <div class="text-lg mt-4 leading-[1.4]">
          <PrismicRichText :field="slice.primary.description" />
        </div>
      </div>
      <div class="hidden w-2/5 lg:flex justify-center items-center">
        <NuxtImg
          v-if="slice.primary.image.url"
          :src="slice.primary.image.url"
          preset="prismicImage"
          :alt="slice.primary.image.alt || 'Hero image'"
          class="object-cover w-full aspect-square max-w-[450px] rounded-full"
        />
      </div>
    </div>
  </div>
</template>
