import { createClient } from "@prismicio/client";

export default defineSitemapEventHandler(async () => {
  const client = createClient("chez-ju");

  try {
    // Récupérer toutes les pages publiées
    const pages = await client.getAllByType("page");

    return pages.map((page) => {
      return {
        loc: page.uid === "home" ? "/" : `/${page.uid}`,
        lastmod: page.last_publication_date,
        changefreq: "weekly",
        priority: page.uid === "home" ? 1.0 : 0.8,
      };
    });
  } catch (error) {
    console.error("Erreur sitemap Prismic:", error);
    return [];
  }
});
