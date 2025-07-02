<script setup lang="ts">
import { ref } from "vue";
import { PrismicRichText } from "@prismicio/vue";
import type { Content, PrismicDocument } from "@prismicio/client";
import HeadingLogo from "~/components/HeadingLogo.vue";
import LogoMorph from "~/components/LogoMorph.vue";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import type { SwiperClass } from "swiper/react";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const { slice } = defineProps(
  getSliceComponentProps<Content.CarouselSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const products = ref<PrismicDocument[]>([]); // Crée une référence pour stocker les produits
const prismic = usePrismic(); // Crée ton client Prismic

// recuperer les produits en fonction de la variation
if (slice.variation === "default") {
  const itemsIDs = extractRelationshipIDs(slice.primary.items);
  const { data } = await useAsyncData(() => prismic.client.getByIDs(itemsIDs));
  products.value = data.value?.results || [];
} else if (slice.variation === "category") {
  // Récupérer l'ID de la catégorie
  const categoryID =
    slice.primary.category && "id" in slice.primary.category
      ? slice.primary.category.id
      : null;

  // Récupérer les produits associés à cette catégorie
  const { data } = await useAsyncData(() =>
    prismic.client.getAllByType("product", {})
  );

  // Filtrer les produits pour ne garder que ceux de la catégorie
  const filteredProducts = data.value?.filter(
    (product) => product.data.category.id === categoryID
  );

  // Stocker les produits récupérés dans la variable products
  // products.value = data?.results || [];
  products.value = filteredProducts || [];
}

// État pour savoir si nous sommes au début ou à la fin
const isAtStart = ref(false);
const isAtEnd = ref(false);

// Gérer les événements de Swiper pour savoir si nous sommes au début ou à la fin
const onSwiper = (swiper: SwiperClass) => {
  isAtStart.value = swiper.isBeginning;
  isAtEnd.value = swiper.isEnd;
};
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="py-14 xl:py-20 max-w-[1440px] mx-auto"
  >
    <PrismicRichText
      :field="slice.primary.title"
      :components="{
        paragraph: HeadingLogo,
        em: LogoMorph,
      }"
    />
    <p
      v-if="slice.primary.subtitle"
      class="text-xl xl:text-[27px] text-secondary font-bold text-center -mt-2"
    >
      {{ slice.primary.subtitle }}
    </p>

    <client-only>
      <Swiper
        class="mt-10 xl:mt-16"
        :modules="[Navigation]"
        :slides-per-view="1"
        :space-between="20"
        :breakpoints="{
          768: { slidesPerView: 3.1 },
          1280: { slidesPerView: 4 },
        }"
        :navigation="{
          nextEl: '.button-next',
          prevEl: '.button-prev',
          disabledClass: 'opacity-50 cursor-default',
        }"
        @swiper="onSwiper"
      >
        <SwiperSlide
          v-for="(product, index) in products"
          :key="index"
          class="px-4 md:px-0 md:last:pr-6 md:last:2xl:pr-12"
        >
          <ProductCard
            :product="product as Content.ProductDocument"
            class="w-full"
          />
        </SwiperSlide>
      </Swiper>
      <div class="flex gap-2 ml-auto w-fit px-6 2xl:px-12 mt-10">
        <button
          class="button-prev w-12 h-12 flex items-center justify-center bg-primary hover:bg-primary/80 rounded-sm cursor-pointer"
        >
          <svg
            class="block text-2xl font-medium text-light transform rotate-180"
            width="24"
            height="8"
            viewBox="0 0 24 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.728 7.8C18.048 7.11733 18.3573 6.52 18.656 6.008C18.976 5.496 19.2853 5.06933 19.584 4.728H0.928V3.384H19.584C19.2853 3.02133 18.976 2.584 18.656 2.072C18.3573 1.56 18.048 0.973332 17.728 0.311999H18.848C20.192 1.86933 21.6 3.02133 23.072 3.768V4.344C21.6 5.06933 20.192 6.22133 18.848 7.8H17.728Z"
              fill="#FBECC9"
            />
          </svg>
        </button>
        <button
          class="button-next w-12 h-12 flex items-center justify-center bg-primary hover:bg-primary/80 rounded-sm cursor-pointer"
        >
          <svg
            class="block text-2xl font-medium text-light"
            width="24"
            height="8"
            viewBox="0 0 24 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.728 7.8C18.048 7.11733 18.3573 6.52 18.656 6.008C18.976 5.496 19.2853 5.06933 19.584 4.728H0.928V3.384H19.584C19.2853 3.02133 18.976 2.584 18.656 2.072C18.3573 1.56 18.048 0.973332 17.728 0.311999H18.848C20.192 1.86933 21.6 3.02133 23.072 3.768V4.344C21.6 5.06933 20.192 6.22133 18.848 7.8H17.728Z"
              fill="#FBECC9"
            />
          </svg>
        </button>
      </div>
    </client-only>
    <div class="mt-10 xl:mt-16 text-center">
      <PrismicLink
        :field="slice.primary.cta"
        class="inline-block px-4 py-2.5 bg-primary text-light hover:text-light/80 rounded-sm text-lg transition uppercase font-black"
      >
        {{ slice.primary.cta?.text }}
      </PrismicLink>
    </div>
  </section>
</template>
