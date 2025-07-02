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

// État responsive
const isDesktop = ref(false);

const checkScreenSize = () => {
  isDesktop.value = window.innerWidth >= 1024;
};

onMounted(() => {
  // Vérification initiale
  checkScreenSize();

  // Listener pour les redimensionnements
  window.addEventListener("resize", checkScreenSize);

  nextTick(() => {
    if (!sectionRef.value || !imageRef.value) return;

    // Configuration mobile : image finale directement
    if (!isDesktop.value) {
      imageRef.value.src = stepImages.value[3] || stepImages.value[0] || "";
      return;
    }

    // Animation desktop uniquement
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top center",
        end: "bottom 70%",
        scrub: 1,
        once: true,
      },
    });

    // Vérifications de sécurité
    const hasAllItems =
      itemRefs.value.length === 4 &&
      itemRefs.value.every((item) => item !== null);
    const hasAllImages = stepImages.value.every((img) => img);

    if (!hasAllItems || !hasAllImages) {
      console.warn("FeatureHighlight: Missing items or images for animation");
      return;
    }

    // Animation séquentielle
    tl
      // Première paire d'items (0, 1)
      .fromTo(
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
      // Changement image vers étape 2
      .call(
        () => {
          if (imageRef.value && stepImages.value[2]) {
            imageRef.value.src = stepImages.value[2];
          }
        },
        [],
        "<" // Pendant l'animation des items
      )

      // Deuxième paire d'items (2, 3)
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
      // Changement vers image finale
      .call(
        () => {
          if (imageRef.value && stepImages.value[3]) {
            imageRef.value.src = stepImages.value[3];
          }
        },
        [],
        "<"
      );
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreenSize);
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
      <!-- Image responsive -->
      <div class="relative mb-8 lg:mb-0">
        <img
          ref="imageRef"
          :src="stepImages[0] || ''"
          :alt="slice.primary.step_1_image?.alt || 'Salade en création'"
          class="aspect-square mx-auto w-full object-contain"
        />
      </div>

      <!-- Items - Stack mobile, absolus desktop -->
      <div
        v-for="(item, index) in slice.primary.items"
        :key="index"
        :ref="(el) => setItemRef(el, index)"
        :class="['mb-5 lg:mb-0', isDesktop ? `lg:absolute item-${index}` : '']"
      >
        <p
          class="bg-light text-primary font-serif font-extrabold p-3 text-xl lg:text-3xl rounded-sm xl:w-fit shadow-lg hover:scale-105 transition-transform cursor-pointer"
        >
          {{ item.headline }}
        </p>
        <div class="mt-2 text-sm opacity-90">
          <PrismicRichText :field="item.description" />
        </div>
      </div>
    </div>
  </section>
</template>

<style>
/* Positions absolues desktop uniquement */
@media (min-width: 1024px) {
  .item-0 {
    top: 8rem;
    left: 4rem;
    transform: translateX(-75%);
  }
  .item-1 {
    top: 10rem;
    right: 7rem;
    max-width: 350px;
    transform: translateX(100%);
  }
  .item-2 {
    bottom: 10rem;
    right: 8rem;
    max-width: 300px;
    transform: translateX(-100%);
  }
  .item-3 {
    bottom: 10rem;
    right: 5rem;
    max-width: 300px;
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
    transform: translateX(100%);
  }
  .item-2 {
    bottom: 10rem;
    left: 3rem;
    transform: translateX(-100%);
  }
  .item-3 {
    bottom: 8rem;
    right: 3rem;
    transform: translateX(100%);
  }
}

/* Hover uniquement desktop */
@media (min-width: 1024px) {
  .item-0:hover,
  .item-1:hover,
  .item-2:hover,
  .item-3:hover {
    z-index: 10;
  }
}
</style>
