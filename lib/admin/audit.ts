import type { SupabaseClient } from "@supabase/supabase-js";

export async function writeAuditEvent(
  supabase: SupabaseClient,
  input: {
    actorAdminId?: string | null;
    action: string;
    entityType?: string;
    entityId?: string;
    metadata?: Record<string, unknown>;
  },
) {
  await supabase.from("audit_events").insert({
    actor_admin_id: input.actorAdminId || null,
    action: input.action,
    entity_type: input.entityType || null,
    entity_id: input.entityId || null,
    metadata: input.metadata || null,
  });
}
