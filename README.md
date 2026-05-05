# VIABIL Landing Page

Static, single-file landing page for **VIABIL**, a Brazilian B2B financial intelligence platform for real estate developers.

## What is included

- `index.html` — production-ready single-file HTML with embedded CSS and JavaScript.
- `AGENTS.md` — instructions for Codex and AI coding agents.
- `package.json` — convenience scripts for local preview.
- `.github/workflows/static-check.yml` — lightweight CI check for repository hygiene.
- `.editorconfig` and `.gitignore`.

## Local preview

No build step is required.

```bash
npm run dev
```

Then open:

```text
http://localhost:4173
```

Alternative without npm:

```bash
python3 -m http.server 4173
```

## Deploy options

### GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the default branch and the repository root.
5. Save.

### Any static host

Deploy `index.html` directly to Netlify, Vercel, Cloudflare Pages, S3, or any static web server.

## Notes for production

- Replace placeholder phone number in the footer.
- Replace testimonial placeholders with approved customer quotes before launch.
- Replace or integrate the official VIABIL logo asset when ready.
- Update form CTAs to link to the CRM, scheduling page, or contact form.
