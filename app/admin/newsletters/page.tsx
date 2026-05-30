import { createNewsletterCampaignAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export default async function NewslettersPage() {
  await requireAdmin();
  const { data: campaigns } = await getSupabaseAdmin()
    .from("newsletter_campaigns")
    .select("id, title, subject, audience, status, created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <main className="admin-main">
      <section className="admin-card">
        <span className="eyebrow">Newsletters</span>
        <h1>Criar campanha</h1>
        <form className="admin-form" action={createNewsletterCampaignAction}>
          <label>
            Título interno
            <input name="title" required />
          </label>
          <label>
            Assunto do e-mail
            <input name="subject" required />
          </label>
          <label>
            Audiência
            <select name="audience" defaultValue="all_subscribed">
              <option value="all_subscribed">Todos inscritos</option>
              <option value="leads">Leads</option>
              <option value="customers">Clientes</option>
            </select>
          </label>
          <label>
            Preview
            <input name="previewText" />
          </label>
          <label>
            HTML do conteúdo
            <textarea name="bodyHtml" rows={10} required defaultValue="<h1>Atualização VIABIL</h1><p>Escreva o conteúdo aqui.</p>" />
          </label>
          <button className="button-primary" type="submit">Salvar rascunho</button>
        </form>
      </section>
      <section className="admin-card">
        <h2>Campanhas recentes</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Assunto</th>
                <th>Audiência</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns?.map((campaign) => (
                <tr key={campaign.id}>
                  <td>{campaign.title}</td>
                  <td>{campaign.subject}</td>
                  <td>{campaign.audience}</td>
                  <td>{campaign.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
