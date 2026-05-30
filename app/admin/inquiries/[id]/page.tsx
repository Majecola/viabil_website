import Link from "next/link";
import { notFound } from "next/navigation";
import { addInquiryNoteAction, updateInquiryStatusAction } from "@/app/admin/actions";
import { ReplyForm } from "@/components/admin/ReplyForm";
import { requireAdmin } from "@/lib/admin/auth";
import { decryptText } from "@/lib/security/crypto";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export default async function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const { data: inquiry } = await supabase
    .from("lead_inquiries")
    .select("*")
    .eq("id", id)
    .single();

  if (!inquiry) {
    notFound();
  }

  const [{ data: notes }, { data: replies }] = await Promise.all([
    supabase.from("inquiry_notes").select("id, note, created_at").eq("inquiry_id", id).order("created_at"),
    supabase.from("inquiry_replies").select("id, subject, body, delivery_status, created_at").eq("inquiry_id", id).order("created_at"),
  ]);

  return (
    <main className="admin-main">
      <Link className="admin-back" href="/admin">← Voltar</Link>
      <div className="admin-detail-grid">
        <section className="admin-card">
          <span className="eyebrow">Inquiry</span>
          <h1>{inquiry.name}</h1>
          <dl className="admin-dl">
            <div><dt>Empresa</dt><dd>{inquiry.company || "-"}</dd></div>
            <div><dt>Cargo</dt><dd>{inquiry.role || "-"}</dd></div>
            <div><dt>E-mail</dt><dd>{inquiry.email}</dd></div>
            <div><dt>Telefone</dt><dd>{decryptText(inquiry.phone_encrypted) || "-"}</dd></div>
            <div><dt>Segmento</dt><dd>{inquiry.segment || "-"}</dd></div>
            <div><dt>Status</dt><dd>{inquiry.status}</dd></div>
            <div><dt>Cliente</dt><dd>{inquiry.is_customer ? "Sim" : "Não"}</dd></div>
          </dl>
          <h2>Mensagem</h2>
          <p className="admin-message">{decryptText(inquiry.message_encrypted) || "-"}</p>
          <form className="admin-inline-form" action={updateInquiryStatusAction}>
            <input type="hidden" name="id" value={id} />
            <select name="status" defaultValue={inquiry.status}>
              <option value="new">new</option>
              <option value="open">open</option>
              <option value="replied">replied</option>
              <option value="closed">closed</option>
            </select>
            <button className="button-secondary" type="submit">Atualizar status</button>
          </form>
        </section>
        <section className="admin-card">
          <h2>Responder por e-mail</h2>
          <ReplyForm inquiryId={id} recipientName={inquiry.name} />
        </section>
      </div>
      <section className="admin-card">
        <h2>Notas internas</h2>
        <form className="admin-form" action={addInquiryNoteAction}>
          <input type="hidden" name="id" value={id} />
          <textarea name="note" rows={4} placeholder="Adicionar observação interna" required />
          <button className="button-secondary" type="submit">Adicionar nota</button>
        </form>
        <div className="admin-timeline">
          {notes?.map((note) => (
            <article key={note.id}>
              <time>{new Date(note.created_at).toLocaleString("pt-BR")}</time>
              <p>{note.note}</p>
            </article>
          ))}
          {replies?.map((reply) => (
            <article key={reply.id}>
              <time>{new Date(reply.created_at).toLocaleString("pt-BR")} · {reply.delivery_status}</time>
              <strong>{reply.subject}</strong>
              <p>{reply.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
