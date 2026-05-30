# VIABIL Backend Setup

## 1. Environment Variables

Copy `.env.example` into the target environment and configure:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PII_ENCRYPTION_KEY`
- `PII_HASH_SECRET`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_NOTIFICATION_EMAIL`
- `VERCEL_ANALYTICS_DRAIN_SECRET`
- `SENTRY_DSN`
- `NEXT_PUBLIC_SENTRY_DSN`
- `SENTRY_ALERT_WEBHOOK_SECRET`
- `ERROR_ALERT_EMAIL`

Generate the encryption key with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Use a different random value for `PII_HASH_SECRET`.

## 2. Supabase

Apply the migration in `supabase/migrations/202605260001_backend_foundation.sql`.

In Supabase Auth:

- Disable public sign-up unless explicitly needed.
- Enforce a strong password policy.
- Enable leaked-password protection when available on the project plan.
- Require MFA for admin users.

Create the first admin user in Supabase Auth, then insert the matching profile:

```sql
insert into public.admin_profiles (auth_user_id, email, full_name, is_master, is_active)
values (
  '<auth.users.id>',
  'admin@viabil.com.br',
  'VIABIL Admin',
  true,
  true
);
```

## 3. Vercel Analytics Drain

Create a Vercel Web Analytics Drain pointing to:

```txt
https://<domain>/api/analytics/vercel
```

Send the secret as:

```txt
Authorization: Bearer <VERCEL_ANALYTICS_DRAIN_SECRET>
```

## 4. Error Alerts

Configure Sentry with the DSNs above.

For email/SMS escalation, create a Sentry webhook to:

```txt
https://<domain>/api/alerts/sentry
```

Send:

```txt
Authorization: Bearer <SENTRY_ALERT_WEBHOOK_SECRET>
```

SMS requires Twilio variables:

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_FROM_NUMBER`
- `ALERT_SMS_TO`

## 5. Admin Panel

The admin panel is available at `/admin`.

It is not linked from public navigation, has `noindex` headers, and still validates admin access server-side. Do not rely on URL secrecy as a security control.
