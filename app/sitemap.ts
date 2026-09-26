import type { MetadataRoute } from "next";
import { LEGACY_ROUTES_ENABLED } from "@/lib/legacy-routes";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.viabil.com.br";

type Route = { path: string; priority: number; changeFrequency: "weekly" | "monthly" };

/** Live while the site is the one-page landing. */
const liveRoutes: Route[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/privacidade", priority: 0.3, changeFrequency: "monthly" },
  { path: "/termos", priority: 0.3, changeFrequency: "monthly" },
  { path: "/cookies", priority: 0.3, changeFrequency: "monthly" },
];

/** The v0 multi-page site — only listed when those routes are switched on. */
const legacyRoutes: Route[] = [
  { path: "/plataforma", priority: 0.9, changeFrequency: "monthly" },
  { path: "/modulos", priority: 0.9, changeFrequency: "monthly" },
  { path: "/segmentos", priority: 0.8, changeFrequency: "monthly" },
  { path: "/versoes", priority: 0.8, changeFrequency: "monthly" },
  { path: "/servicos", priority: 0.8, changeFrequency: "monthly" },
  { path: "/sobre", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contato", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = LEGACY_ROUTES_ENABLED ? [...liveRoutes, ...legacyRoutes] : liveRoutes;

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
