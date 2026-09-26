/**
 * Cookie/tracking consent (LGPD).
 *
 * Only the strictly necessary category is ever on by default. Analytics stays
 * off until the visitor opts in, which is why `<Analytics />` is mounted behind
 * `useConsent()` rather than directly in the layout.
 */

export const CONSENT_STORAGE_KEY = "viabil:consent";
export const CONSENT_VERSION = 1;
/** Re-ask after this long so a stored choice never becomes permanent. */
export const CONSENT_TTL_DAYS = 365;

export type ConsentState = {
  version: number;
  decidedAt: number;
  analytics: boolean;
};

export const CONSENT_EVENT = "viabil:consent-change";

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (parsed.version !== CONSENT_VERSION) return null;
    if (typeof parsed.decidedAt !== "number") return null;

    const age = Date.now() - parsed.decidedAt;
    if (age > CONSENT_TTL_DAYS * 24 * 60 * 60 * 1000) return null;

    return {
      version: CONSENT_VERSION,
      decidedAt: parsed.decidedAt,
      analytics: parsed.analytics === true,
    };
  } catch {
    return null;
  }
}

export function writeConsent(analytics: boolean): ConsentState {
  const state: ConsentState = {
    version: CONSENT_VERSION,
    decidedAt: Date.now(),
    analytics,
  };

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* private mode — the banner simply asks again next visit */
  }

  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
  return state;
}

export function clearConsent() {
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    /* nothing to clear */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
}
