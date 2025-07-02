import { register } from "swiper/element";

export default defineNuxtPlugin(async () => {
  if (import.meta.client) {
    register();
  }
});
