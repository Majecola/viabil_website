import Link from "next/link";
import { LoginForm } from "@/components/admin/LoginForm";
import { hasSupabasePublicEnv } from "@/lib/supabase/server";

export default function AdminLoginPage() {
  const configured = hasSupabasePublicEnv();

  return (
    <main className="admin-login">
      <div className="admin-login-card">
        <Link className="brand-lockup" href="/">
          <img className="brand-logo-img" src="/assets/logos/viabil-logo.webp" alt="VIABIL" />
        </Link>
        <span className="eyebrow">Painel administrativo</span>
        <h1>Entrar no admin VIABIL</h1>
        <p>
          Acesso restrito a e-mails aprovados. Use senha forte e MFA configurado no Supabase Auth.
        </p>
        {configured ? (
          <LoginForm />
        ) : (
          <p className="admin-error">
            Configure SUPABASE_URL e SUPABASE_ANON_KEY para habilitar o login.
          </p>
        )}
      </div>
    </main>
  );
}
