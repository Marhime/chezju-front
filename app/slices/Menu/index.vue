<script setup lang="ts">
import type { Content, PrismicDocument } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const { slice } = defineProps(
  getSliceComponentProps<Content.MenuSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

// Products by category, tableau avec les produits par catégorie et le titre de la catégorie. [{title: string, products: PrismicDocument[]}]
const productsByCategory = ref<
  Record<string, { title: string; products: PrismicDocument[] }> | undefined
>(undefined);
const prismic = usePrismic(); // Crée ton client Prismic

// Récupérer les produits associés à cette catégorie
const { data: products } = await useAsyncData(() =>
  prismic.client.getAllByType("product", {})
);

const { data: categories } = await useAsyncData(() =>
  prismic.client.getAllByType("category", {})
);

if (products.value) {
  // const categoryTitle = categories.value?.find(
  //     (category) => category.id === categoryId
  //   )?.data.title;
  // creer un tableau avec les produits par catégorie et le titre de la catégorie
  const categoryMap: Record<
    string,
    { title: string; products: PrismicDocument[] }
  > = {};

  productsByCategory.value = products.value.reduce((acc, product) => {
    const categoryId = product.data.category.id;
    const categoryTitle = categories.value?.find(
      (category) => category.id === categoryId
    )?.data.title;

    if (!acc[categoryId]) {
      acc[categoryId] = { title: categoryTitle, products: [] };
    }
    acc[categoryId].products.push(product);
    return acc;
  }, categoryMap);
}

// Stocker les produits récupérés dans la variable products
// products.value = filteredProducts || [];
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <div class="max-w-[1440px] mx-auto py-10 px-6 lg:px-12">
      <div class="menu__categories space-y-14 xl:space-y-26">
        <div
          v-for="(category, categoryId) in productsByCategory"
          :key="categoryId"
          class=""
        >
          <h2
            class="font-serif text-primary font-black text-6xl text-center mb-10 lg:mb-15 uppercase"
          >
            {{ category.title }}
          </h2>
          <ul
            class="menu__products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10"
          >
            <li
              v-for="product in category.products"
              :key="product.id"
              class="menu__product"
            >
              <ProductCard
                :product="product as Content.ProductDocument"
                class="w-full"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
