"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { Cookie } from "lucide-react";
import {
  CONSENT_EVENT,
  type ConsentState,
  readConsent,
  writeConsent,
} from "@/lib/consent/store";

/**
 * LGPD consent gate.
 *
 * Nothing optional runs before a choice is made: `<Analytics />` only mounts
 * once the visitor has actively accepted. Dismissing without choosing is not
 * an option the banner offers — "Recusar" is a first-class button, same weight
 * as "Aceitar", so refusing is never harder than consenting.
 */
export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [asked, setAsked] = useState(false);
  const [details, setDetails] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setAsked(true);

    const onChange = (event: Event) => {
      setConsent((event as CustomEvent<ConsentState | null>).detail ?? null);
    };

    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  const decide = useCallback((analytics: boolean) => {
    setConsent(writeConsent(analytics));
    setDetails(false);
  }, []);

  return (
    <>
      {consent?.analytics ? <Analytics /> : null}

      {asked && !consent ? (
        <div
          aria-describedby="cookie-consent-text"
          aria-labelledby="cookie-consent-title"
          className="v1-consent"
          role="dialog"
        >
          <div className="v1-consent-head">
            <i aria-hidden="true">
              <Cookie />
            </i>
            <div>
              <h2 id="cookie-consent-title">Cookies e privacidade</h2>
              <p id="cookie-consent-text">
                Cookies essenciais mantêm o site funcionando. Com a sua permissão, usamos também
                medição de audiência agregada — sem publicidade. Recusar não tira nenhuma
                funcionalidade.
              </p>
            </div>
          </div>

          {details ? (
            <dl className="v1-consent-detail">
              <div>
                <dt>Essenciais — sempre ativos</dt>
                <dd>
                  Segurança, envio de formulários e memória das suas escolhas (inclusive esta).
                  Sem eles o site não funciona.
                </dd>
              </div>
              <div>
                <dt>Medição de audiência — opcional</dt>
                <dd>
                  Vercel Analytics, em modo agregado: páginas visitadas e origem da visita, sem
                  identificar você pessoalmente e sem publicidade.
                </dd>
              </div>
            </dl>
          ) : null}

          <div className="v1-consent-actions">
            <button
              className="vbtn vbtn-primary vbtn-sm"
              onClick={() => decide(true)}
              type="button"
            >
              Aceitar todos
            </button>
            <button
              className="vbtn vbtn-outline vbtn-sm"
              onClick={() => decide(false)}
              type="button"
            >
              Somente essenciais
            </button>
          </div>

          <div className="v1-consent-links">
            <button
              aria-expanded={details}
              className="v1-consent-more"
              onClick={() => setDetails((value) => !value)}
              type="button"
            >
              {details ? "Ocultar detalhes" : "Ver detalhes"}
            </button>
            <Link className="v1-consent-more" href="/cookies">
              Política de Cookies
            </Link>
            <Link className="v1-consent-more" href="/privacidade">
              Política de Privacidade
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
