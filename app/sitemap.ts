import type { MetadataRoute } from "next";

const SITE_URL = "https://synq.talk";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: {
        languages: {
          en: SITE_URL,
          pt: `${SITE_URL}?lang=pt`,
          es: `${SITE_URL}?lang=es`,
          fr: `${SITE_URL}?lang=fr`,
        },
      },
    },
  ];
}
