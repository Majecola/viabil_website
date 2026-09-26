import { NextResponse, type NextRequest } from "next/server";
import { matchCustomerByEmail } from "@/lib/leads/customer-match";
import { hashIdentifier, normalizeEmail } from "@/lib/security/hash";
import { getSupabaseAdmin, hasSupabaseAdminEnv } from "@/lib/supabase/admin";
import { prototypeRequestSchema } from "@/lib/validation/contact";

/**
 * Lead magnet: "protótipo de viabilidade em Excel".
 *
 * The request is stored in `newsletter_subscribers` so the commercial team sees
 * it next to the other opt-ins. The newsletter checkbox is what drives consent —
 * downloading the model alone does NOT subscribe anyone.
 */
export async function POST(request: NextRequest) {
  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json({ error: "Cadastro indisponível no momento." }, { status: 503 });
  }

  const payload = await request.json().catch(() => null);
  const parsed = prototypeRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Informe um e-mail válido." }, { status: 400 });
  }

  const input = parsed.data;
  const supabase = getSupabaseAdmin();
  const email = normalizeEmail(input.email);
  const customerMatch = await matchCustomerByEmail(supabase, email);
  const sourcePage = `prototipo-viabilidade${input.sourcePage ? ` · ${input.sourcePage}` : ""}`;

  const { data: existing } = await supabase
    .from("newsletter_subscribers")
    .select("id, consent")
    .eq("email", email)
    .maybeSingle();

  const profile = {
    name: input.name || null,
    company: input.company || null,
    segment: input.segment || null,
    source_page: sourcePage,
    is_customer: customerMatch.isCustomer,
    customer_match_source: customerMatch.source,
  };

  // Never downgrade an existing subscription because someone skipped the checkbox.
  const consent = input.newsletter
    ? "subscribed"
    : existing?.consent === "subscribed"
      ? "subscribed"
      : "pending";

  const { error } = existing
    ? await supabase
        .from("newsletter_subscribers")
        .update({
          ...profile,
          consent,
          ...(input.newsletter ? { unsubscribed_at: null } : {}),
        })
        .eq("id", existing.id)
    : await supabase.from("newsletter_subscribers").insert({
        ...profile,
        email,
        email_hash: hashIdentifier(email),
        consent,
      });

  if (error) {
    console.error("Failed to register prototype request", error);
    return NextResponse.json(
      { error: "Não foi possível registrar seu pedido agora." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    downloadUrl: process.env.NEXT_PUBLIC_PROTOTYPE_FILE_URL || null,
  });
}
