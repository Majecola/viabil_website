import { NextResponse, type NextRequest } from "next/server";
import { matchCustomerByEmail } from "@/lib/leads/customer-match";
import { hashIdentifier, normalizeEmail } from "@/lib/security/hash";
import { getSupabaseAdmin, hasSupabaseAdminEnv } from "@/lib/supabase/admin";
import { newsletterSubscribeSchema } from "@/lib/validation/contact";

export async function POST(request: NextRequest) {
  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json({ error: "Newsletter is not configured." }, { status: 503 });
  }

  const payload = await request.json().catch(() => null);
  const parsed = newsletterSubscribeSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Informe um e-mail válido." }, { status: 400 });
  }

  const input = parsed.data;
  const supabase = getSupabaseAdmin();
  const email = normalizeEmail(input.email);
  const customerMatch = await matchCustomerByEmail(supabase, email);

  const { error } = await supabase
    .from("newsletter_subscribers")
    .upsert(
      {
        email,
        email_hash: hashIdentifier(email),
        name: input.name || null,
        company: input.company || null,
        role: input.role || null,
        segment: input.segment || null,
        source_page: input.sourcePage || null,
        consent: "subscribed",
        is_customer: customerMatch.isCustomer,
        customer_match_source: customerMatch.source,
        unsubscribed_at: null,
      },
      { onConflict: "email" },
    );

  if (error) {
    console.error("Failed to subscribe newsletter contact", error);
    return NextResponse.json({ error: "Não foi possível registrar sua inscrição agora." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, isCustomer: customerMatch.isCustomer });
}
