import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { writeAuditEvent } from "@/lib/admin/audit";
import { decryptText } from "@/lib/security/crypto";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

function csvCell(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET() {
  const admin = await requireAdmin();
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("lead_inquiries")
    .select("id, name, company, role, email, phone_encrypted, segment, status, is_customer, created_at, updated_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to export leads." }, { status: 500 });
  }

  const headers = [
    "Nome",
    "Empresa",
    "Cargo",
    "E-mail",
    "Telefone",
    "Segmento",
    "Status",
    "Cliente",
    "Criado em",
    "Atualizado em",
  ];
  const rows = (data || []).map((lead) => [
    lead.name,
    lead.company,
    lead.role,
    lead.email,
    decryptText(lead.phone_encrypted),
    lead.segment,
    lead.status,
    lead.is_customer ? "Sim" : "Não",
    lead.created_at,
    lead.updated_at,
  ]);
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");

  await writeAuditEvent(supabase, {
    actorAdminId: admin.id,
    action: "lead.export",
    entityType: "lead_inquiry",
    metadata: { count: data?.length || 0 },
  });

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="viabil-leads.csv"`,
    },
  });
}
