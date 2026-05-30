import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseAdmin, hasSupabaseAdminEnv } from "@/lib/supabase/admin";

function isAuthorized(request: NextRequest) {
  const expected = process.env.VERCEL_ANALYTICS_DRAIN_SECRET;

  if (!expected) {
    return false;
  }

  const provided = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return provided === expected;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json({ error: "Analytics storage is not configured." }, { status: 503 });
  }

  const payload = await request.json().catch(() => null);
  const events = Array.isArray(payload) ? payload : [payload];
  const rows = events.filter(Boolean).map((event: Record<string, unknown>) => ({
    event_name: String(event.event || event.name || event.type || "vercel_event"),
    source: "vercel",
    path: typeof event.path === "string" ? event.path : null,
    referrer: typeof event.referrer === "string" ? event.referrer : null,
    country: typeof event.country === "string" ? event.country : null,
    region: typeof event.region === "string" ? event.region : null,
    city: typeof event.city === "string" ? event.city : null,
    device: typeof event.device === "string" ? event.device : null,
    browser: typeof event.browser === "string" ? event.browser : null,
    os: typeof event.os === "string" ? event.os : null,
    properties: event,
    occurred_at: typeof event.timestamp === "string" ? event.timestamp : new Date().toISOString(),
  }));

  if (!rows.length) {
    return NextResponse.json({ ok: true, inserted: 0 });
  }

  const { error } = await getSupabaseAdmin().from("analytics_events").insert(rows);

  if (error) {
    console.error("Failed to store analytics drain events", error);
    return NextResponse.json({ error: "Failed to store events" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, inserted: rows.length });
}
