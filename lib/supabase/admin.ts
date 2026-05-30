import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getServiceSupabaseEnv } from "@/lib/env";

let adminClient: SupabaseClient | null = null;

export function hasSupabaseAdminEnv() {
  return Boolean(getServiceSupabaseEnv());
}

export function getSupabaseAdmin() {
  const env = getServiceSupabaseEnv();

  if (!env) {
    throw new Error("Supabase service role environment is not configured.");
  }

  if (!adminClient) {
    adminClient = createClient(env.url, env.serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return adminClient;
}
