import type { SupabaseClient } from "@supabase/supabase-js";
import { normalizeEmail } from "@/lib/security/hash";

export async function matchCustomerByEmail(supabase: SupabaseClient, email: string) {
  const normalizedEmail = normalizeEmail(email);
  const domain = normalizedEmail.split("@")[1] || "";

  if (!domain) {
    return { isCustomer: false, source: null as string | null };
  }

  const { data } = await supabase
    .from("customer_match_rules")
    .select("rule_type, rule_value, company_name")
    .eq("is_active", true)
    .in("rule_value", [normalizedEmail, domain]);

  const exact = data?.find((rule) => rule.rule_type === "email" && rule.rule_value === normalizedEmail);
  const domainRule = data?.find((rule) => rule.rule_type === "domain" && rule.rule_value === domain);
  const rule = exact || domainRule;

  return {
    isCustomer: Boolean(rule),
    source: rule ? `${rule.rule_type}:${rule.rule_value}` : null,
  };
}
