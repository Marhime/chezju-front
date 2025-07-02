<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const { slice } = defineProps(
  getSliceComponentProps<Content.HeroTitleSlice>([
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
    class="p-6 2xl:px-12 py-14 lg:py-20"
  >
    <h1
      class="font-serif font-black text-primary text-6xl lg:text-9xl text-center uppercase"
    >
      {{ slice.primary.title }}
    </h1>
    <p
      class="text-base max-w-[800px] mt-6 font-regular mx-auto text-dark text-center"
    >
      {{ slice.primary.description }}
    </p>
  </section>
</template>
