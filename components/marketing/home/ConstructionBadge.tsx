"use client";

import { useEffect, useState } from "react";
import { HardHat, X } from "lucide-react";
import { CONSENT_EVENT, readConsent } from "@/lib/consent/store";

const STORAGE_KEY = "viabil:construcao-dismissed";

/**
 * Temporary notice while only the compressed v1 landing is published.
 * Remove this component once the full site goes live.
 */
export function ConstructionBadge() {
  const [visible, setVisible] = useState(false);
  // One interruption at a time: the cookie notice has to be answered first.
  const [consentSettled, setConsentSettled] = useState(false);

  useEffect(() => {
    setConsentSettled(readConsent() !== null);

    const onConsentChange = () => setConsentSettled(readConsent() !== null);
    window.addEventListener(CONSENT_EVENT, onConsentChange);

    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === "1") {
        return () => window.removeEventListener(CONSENT_EVENT, onConsentChange);
      }
    } catch {
      /* private mode — show it anyway */
    }

    const timer = window.setTimeout(() => setVisible(true), 1200);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(CONSENT_EVENT, onConsentChange);
    };
  }, []);

  if (!visible || !consentSettled) return null;

  return (
    <div className="v1-construction" role="status">
      <HardHat aria-hidden="true" />
      <span>
        Site em construção<span className="v1-construction-long">
          {" "}— nova versão completa em breve.
        </span>
      </span>
      <button
        aria-label="Dispensar aviso"
        onClick={() => {
          setVisible(false);
          try {
            window.sessionStorage.setItem(STORAGE_KEY, "1");
          } catch {
            /* ignore */
          }
        }}
        type="button"
      >
        <X aria-hidden="true" />
      </button>
    </div>
  );
}
