import { ClientsMarquee } from "@/components/marketing/ClientsMarquee";
import { ImplantacaoStepper } from "@/components/marketing/ImplantacaoStepper";
import { PlataformaFeatures } from "@/components/marketing/PlataformaFeatures";
import { ProofMetrics } from "@/components/marketing/ProofMetrics";
import { ViabilidadeFeatures } from "@/components/marketing/ViabilidadeFeatures";
import { CicloSection } from "@/components/marketing/home/CicloSection";
import { DepoimentosPremium } from "@/components/marketing/home/DepoimentosPremium";
import { HeroV1 } from "@/components/marketing/home/HeroV1";
import { HomeContato } from "@/components/marketing/home/HomeContato";
import { MercadoRadar } from "@/components/marketing/home/MercadoRadar";
import { ModulosSection } from "@/components/marketing/home/ModulosSection";
import { SegmentosSection } from "@/components/marketing/home/SegmentosSection";
import { V1Reveal } from "@/components/marketing/home/V1Reveal";

export function HomeLanding() {
  return (
    <div className="v1">
      <V1Reveal />

      <HeroV1 />

      <section
        aria-label="Resultados que sustentam a confiança"
        className="proof-strip"
        id="prova"
      >
        <ProofMetrics />
      </section>

      <section aria-label="Clientes VIABIL" className="v1-band is-tight" id="clientes">
        <div className="v1-shell">
          <div className="v1-head is-center v1-rise" style={{ marginBottom: 30 }}>
            <span className="v1-kicker">Prova de mercado</span>
            <h2 className="v1-title" style={{ fontSize: "clamp(22px, 2.2vw, 30px)" }}>
              Empresas que confiam no padrão VIABIL.
            </h2>
          </div>
          <div className="v1-rise v1-rise-1">
            <ClientsMarquee />
          </div>
        </div>
      </section>

      <section
        aria-label="A plataforma VIABIL"
        className="v1-band is-white is-flush"
        id="plataforma"
      >
        <PlataformaFeatures />
      </section>

      <CicloSection />

      <ModulosSection />

      <section aria-label="Módulo de Viabilidade" className="v1-band is-surface" id="viabilidade">
        <div className="v1-rise">
          <ViabilidadeFeatures />
        </div>
      </section>

      <SegmentosSection />

      <section className="v1-band is-white" id="implantacao">
        <div className="v1-shell">
          <div className="v1-head is-split v1-rise">
            <div>
              <span className="v1-kicker">Implantação</span>
              <h2 className="v1-title">Da contratação ao uso seguro em estudos reais.</h2>
            </div>
            <p className="v1-lede">
              Parametrizar é traduzir a forma de trabalho da empresa para O VIABIL. O caminho é
              estruturado em quatro fases acompanhadas pela nossa equipe — tecnologia sem conteúdo
              é pouco eficaz.
            </p>
          </div>
          <ImplantacaoStepper />
        </div>
      </section>

      <MercadoRadar />

      <DepoimentosPremium />

      <HomeContato />
    </div>
  );
}
