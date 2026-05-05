# AGENTS.md

## Project

VIABIL static landing page.

This repository intentionally uses a single deployable `index.html` file with embedded CSS and JavaScript. Keep it framework-free unless explicitly requested.

## Constraints

- Use semantic HTML5.
- Use vanilla CSS only.
- Use vanilla JavaScript only.
- Do not introduce build tools or frameworks unless requested.
- Do not split the page into multiple runtime assets unless requested.
- Keep the page deployable by opening `index.html` directly in a browser.
- No external dependencies except the Google Fonts import already present in the HTML.

## Brand

Core colors are defined as CSS custom properties in `:root`:

- `--green-primary: #0B5E34`
- `--green-mid: #138A4B`
- `--green-lime: #4DC97A`
- `--graphite: #1A2320`
- `--graphite-mid: #2C3830`
- `--off-white: #F5F4F0`
- `--grey-mid: #7A8B85`
- `--grey-light: #E8EBE9`
- `--orange-lite: #E8660C`

## Coding standards

- Preserve accessibility attributes on navigation, buttons, menu, SVGs, and sections.
- Keep focus-visible states.
- Keep `prefers-reduced-motion` handling.
- Test responsive behavior at 1440px, 1024px, 768px, 440px, and 360px.
- Keep Portuguese copy unless the task explicitly asks for translation.
- Prefer small, targeted changes over rewrites.

## Common tasks for Codex

- Replace placeholder contact info.
- Wire CTA links to a form or scheduling tool.
- Swap inline placeholder logo SVG with official logo asset when provided.
- Split CSS/JS into separate files only if the user asks.
- Add analytics snippets only after confirming provider and consent requirements.
