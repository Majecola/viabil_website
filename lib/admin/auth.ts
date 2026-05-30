import { redirect } from "next/navigation";
import { getSupabaseServer, hasSupabasePublicEnv } from "@/lib/supabase/server";

export type CurrentAdmin = {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  is_master: boolean;
};

export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  if (!hasSupabasePublicEnv()) {
    return null;
  }

  const supabase = await getSupabaseServer();
  const { data: userData } = await supabase.auth.getUser();
  const email = userData.user?.email;

  if (!userData.user || !email) {
    return null;
  }

  const { data } = await supabase
    .from("admin_profiles")
    .select("id, email, full_name, role, is_master")
    .eq("is_active", true)
    .or(`auth_user_id.eq.${userData.user.id},email.eq.${email.toLowerCase()}`)
    .maybeSingle();

  if (!data) {
    return null;
  }

  return data as CurrentAdmin;
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return admin;
}
