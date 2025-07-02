<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const { slice } = defineProps(
  getSliceComponentProps<Content.FeatureHighlightSlice>([
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
    class="bg-primary p-6 2xl:px-12 pt-14 lg:pt-20 text-light lg:pb-0"
  >
    <h2 class="font-serif font-extrabold m-heading-xl uppercase text-center">
      {{ slice.primary.title }}
    </h2>
    <p class="max-w-[864px] text-lg mt-3 leading-none mx-auto text-center">
      {{ slice.primary.description }}
    </p>
    <div class="lg:px-12 lg:py-44 relative w-full max-w-[500px] mx-auto">
      <NuxtImg
        v-if="slice.primary.image.url"
        :src="slice.primary.image.url"
        preset="prismicImage"
        :alt="slice.primary.image.alt || 'Hero image'"
        class="aspect-square mx-auto w-full"
      />
      <div
        v-for="(item, index) in slice.primary.items"
        :key="index"
        :class="`mb-5 lg:mb-0 lg:absolute item-${index}`"
      >
        <p
          class="bg-light text-primary font-serif font-extrabold p-3 text-xl lg:text-3xl rounded-sm xl:w-fit"
        >
          {{ item.headline }}
        </p>
        <div class="mt-2 text-sm">
          <PrismicRichText :field="item.description" />
        </div>
      </div>
    </div>
  </section>
</template>

<style>
/* min-width >= 1000px */
@media (min-width: 1000px) {
  .item-0 {
    top: 10rem;
    left: 0rem;
    transform: translateX(-75%);
  }
  .item-1 {
    top: 10rem;
    right: 0rem;
    width: 400px;
    transform: translateX(100%);
  }

  .item-2 {
    bottom: 10rem;
    right: 10rem;
    width: 300px;
    transform: translateX(-100%);
  }

  .item-3 {
    bottom: 10rem;
    right: 0rem;
    width: 400px;
    transform: translateX(100%);
  }
}
</style>
