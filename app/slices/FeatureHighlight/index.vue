<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const { slice } = defineProps(
  getSliceComponentProps<Content.FeatureHighlightSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const sectionRef = ref<HTMLElement | null>(null);
const imageRef = ref<HTMLImageElement | null>(null);
const itemRefs = ref<HTMLElement[]>([]);

// Images des étapes de création
const stepImages = computed(() => [
  slice.primary.step_1_image?.url || slice.primary.step_1_image?.url,
  slice.primary.step_2_image?.url || slice.primary.step_1_image?.url,
  slice.primary.step_3_image?.url || slice.primary.step_1_image?.url,
  slice.primary.step_4_image?.url || slice.primary.step_1_image?.url,
]);

// Fonction pour setter les refs correctement
const setItemRef = (
  el: Element | ComponentPublicInstance | null,
  index: number
) => {
  if (el) {
    itemRefs.value[index] = el as HTMLElement;
  }
};

onMounted(() => {
  if (window.innerWidth < 1000) {
    // Si la largeur de l'écran est inférieure à 1000px, on ne lance pas l'animation
    imageRef.value?.setAttribute("src", stepImages.value[3] || "");
    return;
  }
  nextTick(() => {
    if (!sectionRef.value) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top center",
        end: "bottom 70%",
        scrub: 1,
        once: true,
      },
    });

    if (
      !itemRefs.value[0] ||
      !itemRefs.value[1] ||
      !itemRefs.value[2] ||
      !itemRefs.value[3] ||
      !stepImages.value[0] ||
      !stepImages.value[1] ||
      !stepImages.value[2] ||
      !stepImages.value[3]
    )
      return;

    tl.fromTo(
      [itemRefs.value[0], itemRefs.value[1]],
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.2)",
      }
    )
      .call(
        () => {
          if (imageRef.value) {
            imageRef.value.src = stepImages.value[2];
          }
        },
        null,
        "<"
      )

      .fromTo(
        [itemRefs.value[2], itemRefs.value[3]],
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.2)",
        }
      )
      .call(
        () => {
          if (imageRef.value) {
            imageRef.value.src = stepImages.value[3];
          }
        },
        null,
        "<"
      );
  });
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
</script>

<template>
  <section
    ref="sectionRef"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="bg-primary p-6 2xl:px-12 pt-14 lg:pt-20 text-light relative overflow-hidden"
  >
    <h2 class="font-serif font-extrabold m-heading-xl uppercase text-center">
      {{ slice.primary.title }}
    </h2>
    <p class="max-w-[864px] text-lg mt-3 leading-none mx-auto text-center">
      {{ slice.primary.description }}
    </p>

    <div class="lg:px-12 lg:py-44 relative w-full max-w-[500px] mx-auto">
      <!-- Image animée -->
      <div class="relative">
        <!-- <img
          v-for="(image, index) in stepImages"
          :key="index"
          :src="image"
          :alt="slice.primary.step_1_image?.alt || 'Salade en création'"
          class="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 z-20"
          :class="{ 'opacity-0': index !== 0 }"
        /> -->
        <img
          ref="imageRef"
          :src="stepImages[0] ?? ''"
          :alt="slice.primary.step_1_image?.alt || 'Salade en création'"
          class="aspect-square mx-auto w-full object-contain"
        />
        <img
          v-if="stepImages[0]"
          :src="stepImages[0]"
          :alt="slice.primary.step_2_image?.alt || 'Salade en création'"
          class="absolute top-0 left-0 w-full h-full object-contain opacity-0 transition-opacity duration-500 z-30"
        />
      </div>

      <!-- Items animés -->
      <div
        v-for="(item, index) in slice.primary.items"
        :key="index"
        :ref="(el) => setItemRef(el, index)"
        :class="`mb-5 lg:mb-0 lg:absolute item-${index}`"
      >
        <p
          class="bg-light text-primary font-serif font-extrabold p-3 text-xl lg:text-3xl rounded-sm xl:w-fit shadow-lg"
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
/* Positions des items */
@media (min-width: 1024px) {
  .item-0 {
    top: 8rem;
    left: 4rem;
    transform: translateX(-75%);
  }
  .item-1 {
    top: 10rem;
    right: 7rem;
    width: 350px;
    transform: translateX(100%);
  }
  .item-2 {
    bottom: 10rem;
    right: 8rem;
    width: 300px;
    transform: translateX(-100%);
  }
  .item-3 {
    bottom: 10rem;
    right: 5rem;
    width: 300px;
    transform: translateX(100%);
  }
}

@media (min-width: 1440px) {
  .item-0 {
    top: 8rem;
    left: 0rem;
    transform: translateX(-75%);
  }
  .item-1 {
    top: 10rem;
    right: 0rem;
    width: 350px;
    transform: translateX(100%);
  }
  .item-2 {
    bottom: 10rem;
    left: 3rem;
    width: 300px;
    transform: translateX(-100%);
  }
  .item-3 {
    bottom: 8rem;
    right: 3rem;
    width: 300px;
    transform: translateX(100%);
  }
}

.item-0:hover,
.item-1:hover,
.item-2:hover,
.item-3:hover {
  z-index: 10;
}
</style>
