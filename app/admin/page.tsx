import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { getSupabaseAdmin, hasSupabaseAdminEnv } from "@/lib/supabase/admin";
import { SignOutButton } from "@/components/admin/SignOutButton";

export default async function AdminPage() {
  const admin = await requireAdmin();

  if (!hasSupabaseAdminEnv()) {
    return <AdminFrame adminEmail={admin.email}><p>Configure SUPABASE_SERVICE_ROLE_KEY.</p></AdminFrame>;
  }

  const supabase = getSupabaseAdmin();
  const [inquiries, subscribers, campaigns] = await Promise.all([
    supabase.from("lead_inquiries").select("id", { count: "exact", head: true }),
    supabase.from("newsletter_subscribers").select("id", { count: "exact", head: true }).eq("consent", "subscribed"),
    supabase.from("newsletter_campaigns").select("id", { count: "exact", head: true }),
  ]);

  const { data: latest } = await supabase
    .from("lead_inquiries")
    .select("id, name, company, email, status, is_customer, created_at")
    .order("created_at", { ascending: false })
    .limit(8);

  return (
    <AdminFrame adminEmail={admin.email}>
      <div className="admin-kpis">
        <Metric label="Inquiries" value={inquiries.count || 0} />
        <Metric label="Assinantes" value={subscribers.count || 0} />
        <Metric label="Campanhas" value={campaigns.count || 0} />
      </div>
      <div className="admin-card">
        <div className="admin-card-head">
          <h2>Últimos contatos</h2>
          <a className="button-secondary" href="/api/admin/leads/export">Exportar CSV</a>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Empresa</th>
                <th>Status</th>
                <th>Cliente</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {latest?.map((lead) => (
                <tr key={lead.id}>
                  <td><Link href={`/admin/inquiries/${lead.id}`}>{lead.name}</Link></td>
                  <td>{lead.company || "-"}</td>
                  <td>{lead.status}</td>
                  <td>{lead.is_customer ? "Sim" : "Não"}</td>
                  <td>{new Date(lead.created_at).toLocaleDateString("pt-BR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminFrame>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="admin-metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function AdminFrame({ adminEmail, children }: { adminEmail: string; children: React.ReactNode }) {
  return (
    <>
      <header className="admin-header">
        <div>
          <span className="eyebrow">Admin VIABIL</span>
          <h1>Lead center</h1>
          <p>{adminEmail}</p>
        </div>
        <nav className="admin-nav" aria-label="Admin">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/newsletters">Newsletters</Link>
          <SignOutButton />
        </nav>
      </header>
      <main className="admin-main">{children}</main>
    </>
  );
}
