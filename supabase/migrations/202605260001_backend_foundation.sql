create extension if not exists pgcrypto;

create type lead_status as enum ('new', 'open', 'replied', 'closed');
create type newsletter_status as enum ('draft', 'scheduled', 'sent', 'cancelled');
create type consent_status as enum ('pending', 'subscribed', 'unsubscribed');

create table public.admin_profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid references auth.users(id) on delete set null,
  email text not null unique,
  full_name text,
  role text not null default 'admin',
  is_master boolean not null default false,
  is_active boolean not null default true,
  mfa_required boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.admin_login_attempts (
  id uuid primary key default gen_random_uuid(),
  email_hash text,
  ip_hash text,
  succeeded boolean not null default false,
  locked_until timestamptz,
  user_agent text,
  created_at timestamptz not null default now()
);

create table public.customer_match_rules (
  id uuid primary key default gen_random_uuid(),
  rule_type text not null check (rule_type in ('email', 'domain')),
  rule_value text not null,
  company_name text,
  is_active boolean not null default true,
  created_by uuid references public.admin_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (rule_type, rule_value)
);

create table public.lead_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  role text,
  email text not null,
  email_hash text not null,
  phone_encrypted jsonb,
  phone_hash text,
  segment text,
  source text,
  source_page text,
  message_encrypted jsonb,
  status lead_status not null default 'new',
  assigned_to uuid references public.admin_profiles(id) on delete set null,
  is_customer boolean not null default false,
  customer_match_source text,
  ip_hash text,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.inquiry_notes (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid not null references public.lead_inquiries(id) on delete cascade,
  admin_id uuid references public.admin_profiles(id) on delete set null,
  note text not null,
  created_at timestamptz not null default now()
);

create table public.inquiry_replies (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid not null references public.lead_inquiries(id) on delete cascade,
  admin_id uuid references public.admin_profiles(id) on delete set null,
  subject text not null,
  body text not null,
  recipient_email text not null,
  resend_id text,
  delivery_status text not null default 'queued',
  created_at timestamptz not null default now()
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  email_hash text not null,
  name text,
  company text,
  role text,
  consent consent_status not null default 'subscribed',
  is_customer boolean not null default false,
  customer_match_source text,
  source_page text,
  segment text,
  resend_contact_id text,
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  updated_at timestamptz not null default now()
);

create table public.newsletter_campaigns (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subject text not null,
  audience text not null default 'all_subscribed',
  preview_text text,
  body_html text not null,
  body_json jsonb,
  status newsletter_status not null default 'draft',
  created_by uuid references public.admin_profiles(id) on delete set null,
  scheduled_at timestamptz,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  source text not null default 'site',
  path text,
  referrer text,
  country text,
  region text,
  city text,
  device text,
  browser text,
  os text,
  properties jsonb,
  occurred_at timestamptz not null default now(),
  received_at timestamptz not null default now()
);

create table public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_admin_id uuid references public.admin_profiles(id) on delete set null,
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index lead_inquiries_created_at_idx on public.lead_inquiries(created_at desc);
create index lead_inquiries_status_idx on public.lead_inquiries(status);
create index lead_inquiries_email_hash_idx on public.lead_inquiries(email_hash);
create index newsletter_subscribers_email_hash_idx on public.newsletter_subscribers(email_hash);
create index analytics_events_occurred_at_idx on public.analytics_events(occurred_at desc);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger admin_profiles_touch before update on public.admin_profiles
for each row execute function public.touch_updated_at();

create trigger lead_inquiries_touch before update on public.lead_inquiries
for each row execute function public.touch_updated_at();

create trigger newsletter_subscribers_touch before update on public.newsletter_subscribers
for each row execute function public.touch_updated_at();

create trigger newsletter_campaigns_touch before update on public.newsletter_campaigns
for each row execute function public.touch_updated_at();

alter table public.admin_profiles enable row level security;
alter table public.admin_login_attempts enable row level security;
alter table public.customer_match_rules enable row level security;
alter table public.lead_inquiries enable row level security;
alter table public.inquiry_notes enable row level security;
alter table public.inquiry_replies enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.newsletter_campaigns enable row level security;
alter table public.analytics_events enable row level security;
alter table public.audit_events enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where auth_user_id = auth.uid()
      and is_active = true
  );
$$;

create policy "Admins can manage admin profiles" on public.admin_profiles
  for all using (public.is_admin()) with check (public.is_admin());

create policy "Users can read their own admin profile" on public.admin_profiles
  for select using (auth_user_id = auth.uid() or lower(email) = lower(auth.email()));

create policy "Admins can manage customer match rules" on public.customer_match_rules
  for all using (public.is_admin()) with check (public.is_admin());

create policy "Admins can manage lead inquiries" on public.lead_inquiries
  for all using (public.is_admin()) with check (public.is_admin());

create policy "Admins can manage inquiry notes" on public.inquiry_notes
  for all using (public.is_admin()) with check (public.is_admin());

create policy "Admins can manage inquiry replies" on public.inquiry_replies
  for all using (public.is_admin()) with check (public.is_admin());

create policy "Admins can manage subscribers" on public.newsletter_subscribers
  for all using (public.is_admin()) with check (public.is_admin());

create policy "Admins can manage campaigns" on public.newsletter_campaigns
  for all using (public.is_admin()) with check (public.is_admin());

create policy "Admins can read analytics" on public.analytics_events
  for select using (public.is_admin());

create policy "Admins can read audit events" on public.audit_events
  for select using (public.is_admin());
