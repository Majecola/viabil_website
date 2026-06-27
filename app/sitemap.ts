import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.viabil.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{ path: string; priority: number; changeFrequency: "weekly" | "monthly" }> = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/plataforma", priority: 0.9, changeFrequency: "monthly" },
    { path: "/modulos", priority: 0.9, changeFrequency: "monthly" },
    { path: "/segmentos", priority: 0.8, changeFrequency: "monthly" },
    { path: "/versoes", priority: 0.8, changeFrequency: "monthly" },
    { path: "/servicos", priority: 0.8, changeFrequency: "monthly" },
    { path: "/sobre", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contato", priority: 0.7, changeFrequency: "monthly" },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
