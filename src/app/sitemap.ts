import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * Sitemap. V1 is a single-page site, so there is exactly one URL to list.
 * (`#section` anchors are intentionally excluded , they are not separate
 * indexable pages.)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
