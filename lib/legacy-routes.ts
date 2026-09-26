/**
 * The v0 multi-page site.
 *
 * The live site is currently the one-page landing (`app/page.tsx` →
 * `components/marketing/home/HomeLanding.tsx`). The pages below are the
 * previous multi-page version. Their code is kept intact and is still
 * type-checked and built — they are simply not reachable on the web.
 *
 * To put them back online, flip this flag to `true`. That single change
 * restores the routes, re-adds them to the sitemap, and brings back the
 * "O site completo" column in the footer.
 *
 * The v0 homepage itself is NOT in this list: `app/page.tsx` belongs to the
 * one-pager now. Its old version lives in
 * `components/marketing/landing-page.tsx` and is not wired to any route.
 */
export const LEGACY_ROUTES_ENABLED = false;

/** Paths that only exist while `LEGACY_ROUTES_ENABLED` is true. */
export const LEGACY_ROUTES = [
  "/plataforma",
  "/modulos",
  "/segmentos",
  "/servicos",
  "/versoes",
  "/sobre",
  "/contato",
  "/jornada",
] as const;
