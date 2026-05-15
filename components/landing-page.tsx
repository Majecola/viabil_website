"use client";

import { useEffect } from "react";
import {
  landingBodyHtml,
  landingScript,
  landingStyles,
} from "@/lib/landing-source";

export function LandingPage() {
  useEffect(() => {
    const runLandingScript = new Function(landingScript);
    runLandingScript();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: landingStyles }} />
      <div dangerouslySetInnerHTML={{ __html: landingBodyHtml }} />
    </>
  );
}
