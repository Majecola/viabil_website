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

Use only the official VIABIL color palette provided in `colors.txt`.

Core colors should be defined as CSS custom properties in `:root`:

- `--green-primary: #0A4B35` - Primary Green. Main brand color for logo icon, primary buttons, key highlights, and important UI elements.
- `--green-secondary: #13885E` - Secondary Green. Use for hover states, active elements, gradients, and secondary highlights.
- `--green-light: #5FBF9F` - Light Green. Use for subtle backgrounds, chart fills, and secondary UI details.
- `--black: #0D0D0D` - Primary text color for the VIABIL wordmark, headlines, and main content.
- `--gray-dark: #4A4A4A` - Secondary text color for descriptions, labels, and less important text.
- `--gray-light: #E6E8EB` - UI structure color for borders, dividers, input fields, and subtle backgrounds.
- `--off-white: #FAFAFA` - Main website background color.
- `--blue-technology: #1E3A8A` - Data and intelligence accent for charts, selected data points, and interactive highlights.
- `--orange-lite: #FF7A00` - VIABIL Lite accent color. Use only for the Lite product, CTAs, and differentiation; use sparingly.
- `--success-green: #16A34A` - Success states, confirmations, and completed actions.
- `--warning-yellow: #F59E0B` - Alerts and attention points.
- `--error-red: #DC2626` - Errors and critical messages.

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
