import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { getPublicSupabaseEnv } from "@/lib/env";

export function hasSupabasePublicEnv() {
  return Boolean(getPublicSupabaseEnv());
}

export async function getSupabaseServer() {
  const env = getPublicSupabaseEnv();

  if (!env) {
    throw new Error("Supabase public environment is not configured.");
  }

  const cookieStore = await cookies();

  return createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot set cookies. Route handlers and actions can.
        }
      },
    },
  });
}
