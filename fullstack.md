# VIABIL Fullstack Development Plan

## 1. Goal

Convert the current VIABIL static website into a production-ready full web application while preserving the quality, copy direction, visual identity, and animations of the existing landing page.

The application will be a website and training portal, not the VIABIL product itself.

The first production version should include:

- Public marketing website.
- Public training catalog and training detail pages.
- Authentication.
- User profile/account hub.
- Company manager hub.
- Paid live training booking system.
- VIABIL internal admin area.
- Supabase-backed database and auth.
- Stripe Checkout payments.
- Vercel deployment.

## 2. Core Decisions

Stack:

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- shadcn/ui.
- Supabase Auth and Postgres.
- Supabase Row Level Security.
- Stripe Checkout Sessions.
- Vercel.

Migration principle:

- Pixel-preserve the current landing page first.
- Do not simplify existing animations.
- Improve animations only after the migrated React version matches the current `index.html` behavior.

Product boundary:

- The protected area is an account/profile/training hub.
- Do not build VIABIL software product analytics inside the website unless explicitly requested later.

## 3. Public Website Scope

Create a route structure that supports:

- `/` - landing page.
- `/plataforma` - platform overview.
- `/solucoes` - solutions and use cases.
- `/modulos` - product modules.
- `/treinamentos` - training catalog.
- `/treinamentos/[slug]` - training detail and booking CTA.
- `/viabil-lite` - VIABIL Lite.
- `/conteudos` - resources/blog index.
- `/conteudos/[slug]` - article/resource detail.
- `/clientes` - cases/trust page, only with approved proof.
- `/sobre` - company page.
- `/contato` - contact/demo page.

Homepage sections:

1. Hero with executive value proposition.
2. Trust strip with validated proof numbers.
3. What VIABIL does.
4. Full real estate development cycle.
5. CEO/founder value.
6. Analyst/team value.
7. Product modules.
8. Segment coverage.
9. Market updating.
10. Training and certification.
11. Services and implementation.
12. Final CTA.

## 4. Protected App Scope

Use protected route groups for authenticated users.

User account hub:

- Profile data: name, email, phone, LinkedIn, role/function, company membership, and account settings.
- Personal training bookings.
- Booking/payment status.
- Upcoming and past training sessions.

Company manager hub:

- Company profile.
- Company members.
- Member roles/functions.
- Company training bookings.
- Seat assignment.
- Attendee list.
- Payment/invoice status.

Admin area:

- Manage companies.
- Manage users.
- Manage memberships and roles.
- Create/edit/publish training sessions.
- View bookings.
- Manage attendees.
- View Stripe payment status.
- Review audit logs.

Roles:

- `admin`: VIABIL internal operational access.
- `company_manager`: manages company training bookings and attendees.
- `user`: manages own profile and bookings.

## 5. Data Model

Minimum Supabase tables:

- `profiles`
- `companies`
- `company_memberships`
- `training_sessions`
- `bookings`
- `booking_attendees`
- `payments`
- `audit_logs`

Access rules:

- Public users may browse published trainings.
- Logged-in users may view and manage their own profile/bookings.
- Company managers may manage only their company data and company bookings.
- Admins may manage all operational data.
- Company membership must be invite-controlled or admin/company-manager assigned.
- Do not trust email domain alone for company access.

Security:

- Enable RLS on all application tables.
- Test policies for `user`, `company_manager`, and `admin`.
- Validate every mutation server-side.
- Protect admin routes on the server.
- Store Stripe IDs and payment states only; never store card data.
- Log admin actions and role/membership changes.
- Keep secrets only in environment variables.

## 6. Stripe Booking Flow

Use Stripe Checkout Sessions for one-time paid live training sessions.

Flow:

1. User or company manager selects a published live training session.
2. App creates a pending booking.
3. Server creates a Stripe Checkout Session.
4. User pays through Stripe-hosted checkout.
5. Stripe webhook confirms payment.
6. App marks payment and booking as confirmed.
7. Capacity is reduced/locked only for confirmed paid bookings.
8. Canceled/expired checkouts keep the booking unpaid or release it according to the final booking policy.

## 7. Animation Migration Requirements

Preserve these current landing behaviors:

- Hero load reveal.
- CTA pulse.
- Scroll reveal/stagger.
- Animated counters.
- Dashboard/mockup SVG line and point animations.
- Interactive stage cards.
- Business carousel controls and dots.
- Scroll-driven canvas frame animation.
- Active nav tracking.
- Mobile menu animation.
- Reduced-motion handling.

Implementation approach:

- Extract static sections into React components.
- Keep animation-heavy areas as focused client components.
- Preserve CSS timing, easing, delays, and responsive behavior first.
- Move frame assets into the Next public asset structure.
- Verify side-by-side with the current static page using browser screenshots.
- Only introduce Framer Motion where native CSS/React migration cannot preserve behavior cleanly.

## 8. Suggested Project Structure

```txt
app/
  (public)/
    page.tsx
    plataforma/
    solucoes/
    modulos/
    treinamentos/
    viabil-lite/
    conteudos/
    clientes/
    sobre/
    contato/
  (auth)/
    login/
    cadastro/
    callback/
  app/
    perfil/
    treinamentos/
    reservas/
    empresa/
  admin/
    empresas/
    usuarios/
    treinamentos/
    reservas/
    pagamentos/
    auditoria/
components/
  marketing/
  animation/
  app/
  admin/
  ui/
lib/
  auth/
  supabase/
  stripe/
  validation/
  security/
supabase/
  migrations/
  seed.sql
public/
  assets/
```

## 9. Implementation Phases

### Phase 1 - Foundation

- Scaffold Next.js App Router with TypeScript.
- Add Tailwind CSS and shadcn/ui.
- Configure Supabase client/server helpers.
- Configure Stripe SDK and webhook route.
- Configure lint/build scripts.
- Map VIABIL brand colors into CSS variables and Tailwind tokens.

### Phase 2 - Landing Migration

- Convert current `index.html` into React components.
- Move assets into `public/assets`.
- Preserve current layout, copy, responsive behavior, accessibility, and animations.
- Keep the current landing page visually matching before adding new app features.

### Phase 3 - Public Marketing Pages

- Add public route skeletons for platform, solutions, modules, VIABIL Lite, resources, clients/cases, about, and contact.
- Reuse company context from `AGENTS.md` and `AGENTS_VIABIL_Website_Knowledge.md`.
- Avoid publishing unapproved client names/logos.

### Phase 4 - Auth And Database

- Configure Supabase Auth.
- Create initial migrations.
- Add RLS policies.
- Create profile creation flow.
- Add role and membership handling.

### Phase 5 - Training Booking

- Build training catalog and detail pages.
- Build individual booking flow.
- Build company manager booking flow.
- Add attendee assignment.
- Add booking/payment status states.

### Phase 6 - Admin Operations

- Build admin management screens.
- Add training session publishing controls.
- Add user/company/member controls.
- Add booking and attendee views.
- Add audit log view.

### Phase 7 - Payments

- Create Stripe Checkout Session flow.
- Add webhook confirmation.
- Reconcile payment and booking states.
- Test checkout success, cancel, expired, and duplicate webhook delivery.

### Phase 8 - Verification And Hardening

- Run lint and production build.
- Browser-test at 1440px, 1024px, 768px, 440px, and 360px.
- Verify all landing animations.
- Test Supabase RLS with user, company manager, and admin accounts.
- Test admin route protection.
- Test booking capacity and payment status transitions.
- Check accessibility basics, focus-visible states, forms, and reduced motion.

## 10. Acceptance Criteria

The implementation is acceptable when:

- The migrated landing page visually and behaviorally matches the current static page.
- Existing animations are preserved or improved without simplification.
- Public pages use VIABIL-specific positioning and Brazilian real estate language.
- Users can sign up/login and manage a profile.
- Users can book paid live training sessions through Stripe.
- Company managers can book seats and manage company attendees.
- Admins can manage companies, users, sessions, bookings, payments, and audit logs.
- RLS prevents cross-user and cross-company data access.
- Stripe webhook confirms bookings reliably.
- The app builds cleanly and is deployable to Vercel.

## 11. Assumptions

- Portuguese remains the default website language.
- Public proof numbers must be validated before final publication.
- Client names/logos are not displayed without explicit approval.
- VIABIL Lite remains visually related to VIABIL and uses orange sparingly.
- The website/training portal is separate from the core VIABIL software product.
- If Supabase becomes limiting later, backend-heavy logic may migrate to Django/Postgres, but v1 starts with Supabase.
