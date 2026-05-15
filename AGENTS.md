# AGENTS.md

## Project

VIABIL website and training portal.

The repository currently contains a static `index.html` landing page, but the target direction is to convert the site into a full web application with:

- Next.js App Router frontend.
- Supabase Auth, Postgres, Storage where needed, and Row Level Security.
- Stripe Checkout for paid live training sessions.
- Vercel deployment.
- Tailwind CSS and shadcn/ui for application UI.

Until the migration is implemented, preserve the existing landing page behavior and assets when making targeted edits to `index.html`.

## Company Context

VIABIL is a Brazilian B2B software company focused on financial feasibility, investment analysis, landbank control, and performance monitoring for real estate development projects.

Present VIABIL as a mature, trusted, market-tested reference in Brazilian real estate financial feasibility. Do not describe it as a startup, a generic SaaS product, a simple calculator, or only a spreadsheet replacement.

Core positioning:

- Brazilian reference platform for financial intelligence across the real estate development cycle.
- Built for incorporadoras, construtoras, developers, real estate funds, private equity firms, investors, consultants, and real estate decision teams.
- Supports decisions from land acquisition and origination through feasibility, scenario simulation, approval, planned vs. actual monitoring, and replanning.
- Becoming more modern, complete, data-driven, and connected without losing historic trust.

Primary audience:

- CEOs, founders, C-level executives, CFOs, directors of new business, directors of real estate development, and investment decision-makers.

Secondary audience:

- Analysts, land acquisition teams, financial planning teams, consultants, funds, project managers, and daily VIABIL users.

The first impression should speak to executives: confidence, authority, strategic value, risk reduction, governance, and market trust. Technical sections should still respect analysts with concrete depth and real estate-specific language.

Detailed source context lives in `AGENTS_VIABIL_Website_Knowledge.md`. Use it when writing copy, planning pages, or making product/positioning decisions.

## Website Strategy

The website must communicate that VIABIL is broader than initial feasibility analysis.

Emphasize:

- Financial intelligence for the full real estate development cycle.
- Land and opportunity management.
- Feasibility analysis and scenario simulation.
- Planned vs. actual monitoring.
- Route correction and replanning.
- Workflow/process control.
- Services, implementation, support, customizations, advisory, and integrations where approved.
- Training and certification as professional qualification signals.

Pain points to address:

- Land acquisition mistakes are expensive.
- High-value real estate decisions carry financial risk.
- Spreadsheets are fragile, inconsistent, hard to govern, and error-prone.
- Teams need standardized assumptions and market-tested variables.
- Projects change after approval and need planned vs. actual monitoring.
- Market, tax, financing, legal, and regulatory rules change quickly.
- Executives need reliable indicators before approving investments.

Avoid:

- Startup hype, generic SaaS language, empty AI promises, overplayful copy, and old institutional brochure language.
- Overpromising integrations, automation, AI, or product capabilities.
- Making VIABIL look limited to one project type, one module, or only initial feasibility.
- Publishing client names/logos or implying active relationships without explicit approval.

## Public Pages

The converted app should reserve structure for core public marketing/display pages:

- Home / landing page.
- Plataforma.
- Solucoes.
- Modulos.
- Treinamentos.
- VIABIL Lite.
- Conteudos / Blog / Recursos.
- Clientes / Cases, only with approved proof.
- Sobre.
- Contato.

Recommended homepage flow:

1. Hero with executive value proposition and product/cycle visual.
2. Trust strip with validated proof numbers.
3. What VIABIL does in clear, simple language.
4. Full-cycle section from captacao to previsto vs. realizado and replanning.
5. CEO/founder value section.
6. Analyst/team value section.
7. Product modules.
8. Segment coverage.
9. Market updating.
10. Training and certification.
11. Services and implementation.
12. Final CTA.

## Application Scope

The website application is separate from the VIABIL software product itself.

For the protected area, build a profile/account hub, not a product analytics dashboard. Do not add VIABIL product metrics unless the user explicitly asks to build product functionality.

V1 protected app scope:

- User profile: name, email, phone, LinkedIn, role/function, company membership, and account settings.
- Company profile for company managers: company info, members, roles, training bookings, assigned attendees, and payment/invoice status.
- Training booking system for live scheduled paid sessions.
- Admin area for VIABIL staff to manage companies, users, roles, training sessions, bookings, attendees, and payments.

Roles:

- `admin`: VIABIL internal user with operational access.
- `company_manager`: books training seats and manages attendees for their company.
- `user`: manages personal profile and own bookings.

Signup/access:

- Public signup is allowed for normal individual users.
- Company membership should be invite-controlled or assigned by admin/company manager.
- Company users are linked through company membership, not by trusting email domain alone.

## Fullstack Architecture Target

Use:

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- shadcn/ui.
- Supabase Auth and Postgres.
- Supabase Row Level Security on all app tables.
- Stripe Checkout Sessions for one-time paid training bookings.
- Vercel for deployment and preview environments.

Suggested high-level structure:

```txt
app/
  (public)/
  (auth)/
  app/
  admin/
components/
lib/
  supabase/
  stripe/
  auth/
  validation/
supabase/
  migrations/
  seed.sql
```

Data model should include, at minimum:

- `profiles`
- `companies`
- `company_memberships`
- `training_sessions`
- `bookings`
- `booking_attendees`
- `payments`
- `audit_logs`

Security requirements:

- RLS enabled and tested for all user/company/admin data.
- Tenant isolation by company membership.
- Server-side validation for all mutations.
- Admin-only routes protected on the server.
- Stripe handles card data; store only Stripe IDs and payment state.
- Audit log admin actions and role/membership changes.
- Keep secrets in environment variables only.
- Separate preview and production configuration.

## Animation Migration

Preserving the existing landing page animations is mandatory.

Current animation behaviors include:

- Initial hero reveal animations.
- CTA pulse animation.
- Scroll reveal/stagger effects.
- Animated counters.
- Dashboard/mockup SVG line and point animations.
- Interactive stage cards.
- Business carousel controls/dots.
- Scroll-driven canvas frame animation.
- Active nav section tracking.
- Mobile menu animation.
- `prefers-reduced-motion` handling.

Migration strategy:

1. Pixel-preserve first: port current CSS/JS behavior into isolated React client components as closely as possible.
2. Verify against the current `index.html` before refactoring animation internals.
3. Only modernize with Framer Motion or another animation library if a specific behavior is brittle or cannot be preserved cleanly.
4. Do not simplify or remove animations unless explicitly requested.
5. Any animation improvements must preserve accessibility, performance, and reduced-motion behavior.

## Brand

Use only the official VIABIL color palette provided in `colors.txt`.

Core colors should be defined as CSS custom properties and mapped into Tailwind theme tokens during migration:

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

Green remains the brand anchor, but avoid heavy old-style green blocks. Combine green with graphite, off-white, neutral gray, and restrained data accents.

## Tone And Copy

Tone should be confident, strategic, precise, professional, executive, clear, contemporary, trustworthy, data-driven, and direct.

Write in natural Brazilian Portuguese unless the task explicitly asks for translation.

Preferred concepts:

- Evolui com o mercado.
- Atualizada com a realidade da incorporacao.
- Baseada em conhecimento pratico do setor.
- Criada para decisoes financeiras criticas.
- Do estudo inicial ao acompanhamento do resultado.
- Mais seguranca para decisoes de alto impacto.
- Inteligencia financeira para incorporadoras.

Preferred CTA style:

- Solicitar demonstracao.
- Falar com especialista.
- Agendar conversa.
- Conhecer treinamentos VIABIL.
- Entender o ciclo completo.
- Conhecer o VIABIL Lite.

Avoid weak CTAs such as "Clique aqui", generic "Enviar", and empty "Saiba mais" unless the surrounding context makes the outcome clear.

Proof points may be used as internal guidance, but validate exact wording before publishing:

- More than 500 companies implemented in Brazil.
- More than 5,000 users.
- More than 8,000 professionals trained and certified.
- More than 30 years of accumulated experience.

## Visual Direction

The website should feel modern, premium, clean, data-driven, strategic, executive-ready, financially sophisticated, and connected to real estate development.

Use visual concepts such as:

- Financial curves.
- Scenario paths.
- Land maps.
- Project stages.
- KPI cards.
- Investment gates.
- Planned vs. actual lines.
- Risk indicators.
- Decision routes.
- Data layers.
- Development lifecycle.

Avoid:

- Generic construction stock photos.
- Cliche skyscraper imagery.
- Excessive gradients.
- Heavy legacy green blocks.
- Cluttered dashboards.
- Unreadable data screens.
- Overly futuristic sci-fi visuals.
- Generic startup illustrations.
- Cartoonish icons.

Dashboard visuals used on marketing pages should feel like real estate development finance, not trading or generic analytics. Relevant data labels include VGV, TIR, VPL, margem, ROI, exposicao de caixa, curva de vendas, curva de obra, fluxo de caixa, previsto vs. realizado, cenarios, sensibilidade, terrenos em analise, and projetos aprovados.

## VIABIL Lite

VIABIL Lite is part of the VIABIL brand architecture.

It should feel accessible, practical, lighter, and useful for smaller companies, consultants, and smaller developers, while still clearly belonging to the VIABIL family.

Use `--orange-lite` only for VIABIL Lite accents, CTAs, and differentiation.

## Integrations

Mention integrations carefully.

Allowed style:

- Prepared for integrations.
- Path to integration with market databases and real estate ERPs.
- Integrations with market systems according to project scope.

Do not promise live integrations or mention specific systems such as Sienge unless approved.

## Coding Standards

- Preserve accessibility attributes on navigation, buttons, menus, SVGs, sections, forms, and app controls.
- Keep focus-visible states.
- Keep `prefers-reduced-motion` handling.
- Keep responsive behavior tested at 1440px, 1024px, 768px, 440px, and 360px.
- Prefer small, targeted changes over unrelated rewrites.
- Use server components by default in Next.js; use client components only for interactivity and animation.
- Validate user input at server boundaries.
- Never expose service role keys or Stripe secrets to the client.
- Do not add analytics snippets without confirming provider and consent requirements.

## Common Tasks For Codex

- Update brand/copy while preserving Portuguese tone and market positioning.
- Replace placeholder contact info.
- Wire CTA links to forms, scheduling, training pages, or Stripe-backed booking flows.
- Swap placeholder logo/assets with official assets when provided.
- Preserve or improve landing animations during migration.
- Add public marketing pages following the company context above.
- Add protected profile/company/training booking functionality following the fullstack architecture target.
