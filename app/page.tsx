import { Footer } from "@/components/marketing/Footer";
import { Navbar } from "@/components/marketing/Navbar";
import { RevealController } from "@/components/marketing/RevealController";
import { WhatsAppFloatingButton } from "@/components/marketing/WhatsAppFloatingButton";
import { ConstructionBadge } from "@/components/marketing/home/ConstructionBadge";
import { HomeLanding } from "@/components/marketing/home/HomeLanding";
import { PrototipoModal } from "@/components/marketing/home/PrototipoModal";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.viabil.com.br";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "BDK Solutions",
      url: siteUrl,
      foundingDate: "1995",
      description:
        "Empresa que desenvolve, comercializa, treina, implanta e suporta o VIABIL — software de viabilidade econômico-financeira para empreendimentos imobiliários.",
      areaServed: "BR",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "VIABIL",
      inLanguage: "pt-BR",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "VIABIL",
      url: siteUrl,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Windows, Cloud",
      inLanguage: "pt-BR",
      description:
        "Plataforma de inteligência financeira para o ciclo completo do empreendimento imobiliário: gestão de terrenos, viabilidade, acompanhamento, previsto x realizado e consolidação de resultados.",
      publisher: { "@id": `${siteUrl}/#organization` },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
        description: "Versões Lite, Full e Cloud sob consulta comercial.",
      },
    },
  ],
};

export default function Page() {
  return (
    <div className="site-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Opt into scroll-reveal only when scripting is available, so the page
          never renders as blank content if JS is off or fails. The flag goes on
          <body>, which carries suppressHydrationWarning — putting it on <html>
          makes React report an attribute mismatch on every hydration. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.body.classList.add('v1-anim')`,
        }}
      />
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo" className="site-main">
        <HomeLanding />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <PrototipoModal />
      <ConstructionBadge />
      <RevealController />
    </div>
  );
}
