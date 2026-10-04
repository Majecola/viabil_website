# Legacy (not deployed)

Code and media from earlier versions of the site, kept so they can be brought back.
Nothing in this folder is built, type-checked (`tsconfig.json` excludes `legacy`) or
served: only `public/` is deployed, and these files sit outside it.

## What is here

| Path | What it was |
| --- | --- |
| `components/marketing/landing-page.tsx` | The v0 homepage (before the one-page landing). |
| `components/marketing/DepoimentosSection.tsx` | v0 testimonials carousel (used only by the v0 homepage). |
| `components/marketing/NewsletterSignup.tsx` | v0 newsletter block (the `/api/newsletter` route is still live). |
| `components/marketing/ServicosShowcase.tsx` | v0 services showcase. |
| `lib/generated/landing-styles.ts` | The generated style blob the v0 homepage injected. |
| `public/assets/hero/building.mp4` | v0 hero film (land → building, 23 MB). |
| `public/assets/building_logo.mp4` | Unused building + logo film (18 MB). |
| `public/assets/estagios-scroll/` | Frame sequences for the v0 scroll animation (56 MB). |
| `public/assets/elements/` | v0 map illustrations. |
| `public/assets/modules/` | Unused module mockups (17 MB). |
| `public/assets/segmentos/*.png` | Original segment photos; the live site uses the `.webp` versions. |

## Bringing something back

Paths mirror the project root, so restoring is a move back to the same place:

```bash
git mv legacy/public/assets/hero/building.mp4 public/assets/hero/building.mp4
git mv legacy/components/marketing/landing-page.tsx components/marketing/landing-page.tsx
```

The v0 homepage also needs `lib/generated/landing-styles.ts` and the three components
above restored, plus the assets it references.

The v0 multi-page routes (`/plataforma`, `/modulos`, …) are **not** here: they still live in
`app/(public)/` behind `LEGACY_ROUTES_ENABLED` in `lib/legacy-routes.ts`, because they share
components with the live landing.
