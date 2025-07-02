<script setup lang="ts">
import { asText, isFilled, type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.OurStoryPageSlice>([
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
  >
    <div class="px-6 lg:px-12 py-10 max-w-[1440px] mx-auto">
      <NuxtImg
        v-if="slice.primary.hero_image.url"
        :src="slice.primary.hero_image.url"
        preset="prismicImage"
        :alt="slice.primary.hero_image.alt || 'Background image'"
        class="w-full h-[300px] lg:h-[600px] object-cover rounded-xl"
      />
      <div
        class="px-6 lg:px-12 py-10 pt-20 max-w-[1440px] mx-auto text-center text-2xl font-bold text-primary"
      >
        <p
          class="font-serif font-extrabold m-heading-xl leading-[1.2] text-primary"
        >
          {{
            isFilled.richText(slice.primary.title) &&
            asText(slice.primary.title)
          }}
        </p>
      </div>
    </div>
    <div
      v-for="(item, index) in slice.primary.block_story"
      :key="index"
      :class="`px-6 lg:px-12 py-10 max-w-[1440px] mx-auto lg:flex lg:gap-10 xl:gap-20 2xl:gap-30 justify-between items-center even:flex-row-reverse odd:flex-row`"
    >
      <div class="w-full lg:w-3/5 flex flex-col justify-center">
        <h2
          class="font-serif font-extrabold m-heading-xl leading-[1.2] text-secondary"
        >
          {{ item.title }}
        </h2>
        <div class="text-lg mt-4 leading-[1.4]">
          <PrismicRichText :field="item.text" />
        </div>
      </div>
      <div class="hidden w-2/5 lg:flex justify-center items-center">
        <NuxtImg
          v-if="item.image.url"
          :src="item.image.url"
          preset="prismicImage"
          :alt="item.image.alt || 'Hero image'"
          class="object-cover w-full aspect-square max-w-[450px] rounded-xl"
        />
        <div
          v-else
          class="w-full aspect-square max-w-[450px] rounded-xl bg-gray-200"
        />
      </div>
    </div>
    <div class="px-6 lg:px-12 py-10 pt-20 max-w-[1280px] mx-auto">
      <p
        class="font-serif font-extrabold text-xl lg:text-3xl leading-[1.2] text-center text-primary mb-6"
      >
        {{ slice.primary.final_text }}
      </p>
    </div>
  </section>
</template>
