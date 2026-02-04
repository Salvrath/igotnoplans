import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: "https://igotnoplans.com",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://igotnoplans.com/tonight",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://igotnoplans.com/date-ideas",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
  url: "https://igotnoplans.com/friends",
  lastModified: now,
  changeFrequency: "weekly",
  priority: 0.9,
},
{
  url: "https://igotnoplans.com/solo",
  lastModified: now,
  changeFrequency: "weekly",
  priority: 0.9,
},
{
  url: "https://igotnoplans.com/family",
  lastModified: now,
  changeFrequency: "weekly",
  priority: 0.9,
},
  ];
}
