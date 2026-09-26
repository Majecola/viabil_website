"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { clearConsent } from "@/lib/consent/store";

/** Lets the visitor withdraw their cookie choice from the Cookies page. */
export function ConsentReset() {
  const [cleared, setCleared] = useState(false);

  return (
    <p className="v1-consent-reset">
      <button
        className="vbtn vbtn-outline vbtn-sm"
        onClick={() => {
          clearConsent();
          setCleared(true);
        }}
        type="button"
      >
        <RotateCcw aria-hidden="true" />
        Rever minha escolha de cookies
      </button>
      <span aria-live="polite">
        {cleared ? "Pronto — a sua escolha foi apagada e o aviso vai aparecer novamente." : null}
      </span>
    </p>
  );
}
