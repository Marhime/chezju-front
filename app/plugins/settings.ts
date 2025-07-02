import type { Content } from "@prismicio/client";

export default defineNuxtPlugin(async (app) => {
  if (!app.$settings) {
    const prismic = usePrismic();
    const { data: settings } = await useAsyncData(() =>
      prismic.client.getSingle("settings")
    );
    app.$settings = settings.value?.data as Content.SettingsDocumentData;
  }
});
