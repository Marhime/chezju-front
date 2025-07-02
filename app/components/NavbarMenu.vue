<script lang="ts" setup>
import { isFilled, type Content, type LinkField } from "@prismicio/client";
// Charger le document settings
const app = useNuxtApp();
const data = app.$settings as Content.SettingsDocumentData;

const isOpen = ref(false);

// rediriger vers x page et mettre isOpen à false
function redirectToPage(e: Event, page: LinkField) {
  e.preventDefault();
  if (!isFilled.link(page)) return;
  navigateTo(page.url);
  isOpen.value = false;
}
</script>

<template>
  <nav
    class="navbar flex items-center justify-between py-4 px-6 2xl:px-12 bg-light text-light"
  >
    <ul class="hidden lg:flex space-x-4">
      <li v-for="link in data?.navItems" :key="link.key">
        <PrismicLink
          :field="link"
          class="text-primary hover:text-primary/80 uppercase font-extrabold text-sm"
        >
          {{ link.text }}
        </PrismicLink>
      </li>
    </ul>

    <NuxtLink
      to="/"
      class="text-xl font-bold lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2"
    >
      <NuxtImg
        v-if="data?.logo.url"
        :src="data?.logo.url"
        preset="prismicImage"
        :alt="data?.logo.alt || 'Logo'"
        class="h-10 2xl:h-14"
    /></NuxtLink>

    <a
      class="hidden lg:inline-block px-4 py-2.5 bg-primary hover:bg-primary/80 rounded-sm text-lg transition uppercase font-black"
      :href="data?.click_collect_url || ''"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ "Commander" }}
    </a>
    <button
      class="w-10 flex flex-col items-end justify-center lg:hidden"
      @click="isOpen = !isOpen"
    >
      <span class="block w-full h-0.5 bg-primary mb-1.5 rounded-sm" />
      <span class="block w-[80%] h-0.5 bg-primary mb-1.5 rounded-sm" />
      <span class="block w-[60%] h-0.5 bg-primary rounded-sm" />
    </button>

    <Transition name="fade">
      <div
        v-if="isOpen"
        class="lg:hidden block fixed inset-0 z-50 bg-primary p-4 overflow-y-auto"
      >
        <div class="flex justify-end">
          <button class="w-10 h-10 relative" @click="isOpen = false">
            <span
              class="block w-full rotate-45 h-0.5 bg-light absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-sm"
            />
            <span
              class="block w-full rotate-135 h-0.5 bg-light absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-sm"
            />
          </button>
        </div>
        <div class="flex flex-col items-center justify-center min-h-screen">
          <ul
            class="flex flex-col items-center space-y-9 mt-24 font-serif font-black text-3xl text-light"
          >
            <li v-for="link in data?.navItems" :key="link.key">
              <a
                :href="isFilled.link(link) ? link.url : '#'"
                class="uppercase"
                @click="(e) => redirectToPage(e, link)"
              >
                {{ link.text }}
              </a>
            </li>
            <li>
              <a
                class="inline-block px-4 py-2.5 bg-light text-primary rounded-sm transition uppercase"
                :href="data?.click_collect_url || ''"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ "Commander" }}
              </a>
            </li>
          </ul>
          <div class="mt-20 text-center text-lg text-light">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="inline-block mb-2"
            >
              <path
                d="M10 0C4.47581 0 0 4.47581 0 10C0 15.5242 4.47581 20 10 20C15.5242 20 20 15.5242 20 10C20 4.47581 15.5242 0 10 0ZM10 18.0645C5.54435 18.0645 1.93548 14.4556 1.93548 10C1.93548 5.54435 5.54435 1.93548 10 1.93548C14.4556 1.93548 18.0645 5.54435 18.0645 10C18.0645 14.4556 14.4556 18.0645 10 18.0645ZM12.4919 13.8548L9.06855 11.3669C8.94355 11.2742 8.87097 11.129 8.87097 10.9758V4.35484C8.87097 4.08871 9.08871 3.87097 9.35484 3.87097H10.6452C10.9113 3.87097 11.129 4.08871 11.129 4.35484V10.0685L13.8226 12.0282C14.0403 12.1855 14.0847 12.4879 13.9274 12.7056L13.1694 13.75C13.0121 13.9637 12.7097 14.0121 12.4919 13.8548Z"
                fill="#FFF9F5"
              />
            </svg>
            <p class="">
              {{ data?.opening_days }}
            </p>
            <p class="">
              {{ data?.opening_hours }}
            </p>
          </div>
          <div class="mt-5 text-center text-lg text-light">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="inline-block mb-2"
            >
              <path
                d="M9.99935 1.66699C6.77435 1.66699 4.16602 4.27533 4.16602 7.50033C4.16602 11.8753 9.99935 18.3337 9.99935 18.3337C9.99935 18.3337 15.8327 11.8753 15.8327 7.50033C15.8327 4.27533 13.2243 1.66699 9.99935 1.66699ZM5.83268 7.50033C5.83268 5.20033 7.69935 3.33366 9.99935 3.33366C12.2993 3.33366 14.166 5.20033 14.166 7.50033C14.166 9.90033 11.766 13.492 9.99935 15.7337C8.26602 13.5087 5.83268 9.87533 5.83268 7.50033Z"
                fill="#FFF9F5"
              />
              <path
                d="M9.99935 9.58366C11.1499 9.58366 12.0827 8.65092 12.0827 7.50033C12.0827 6.34973 11.1499 5.41699 9.99935 5.41699C8.84876 5.41699 7.91602 6.34973 7.91602 7.50033C7.91602 8.65092 8.84876 9.58366 9.99935 9.58366Z"
                fill="#FFF9F5"
              />
            </svg>

            <p class="w-48 mx-auto">
              {{ data?.address }}
            </p>
          </div>
          <div class="mt-20 uppercase w-full">
            <p class="text-sm">Nous contacter</p>
            <div
              class="flex items-center justify-between mt-3 text-xs font-extrabold"
            >
              <a :href="`tel:${data?.phone}`">{{ data?.phone }}</a>
              <a :href="`mailto:${data?.email}`">{{ data?.email }}</a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style></style>
