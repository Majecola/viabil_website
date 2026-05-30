"use client";
import { motion } from "motion/react";
import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-columns";

const testimonials: Testimonial[] = [
  {
    text: "O VIABIL é sem sombra de dúvidas o principal software de viabilidade de empreendimentos imobiliários do Brasil. É um instrumento importante para as empresas que pretendem melhorar a governança.",
    name: "Felipe Cavalcante",
    role: "Presidente · ADITBrasil",
    initials: "FC",
  },
  {
    text: "Nestes últimos anos, o mercado imobiliário sofreu uma retração, mas não parou... Diante deste novo cenário, o uso do VIABIL tornou-se ainda mais estratégico e tem papel decisivo na hora de decidirmos em que negócio colocaremos nossas energias e nossos recursos.",
    name: "Hélio Abreu",
    role: "Sócio-Diretor · Record",
    initials: "HA",
  },
  {
    text: "O VIABIL é uma ferramenta indispensável no dia a dia da empresa, proporcionando controle, organização, segurança e agilidade para os negócios.",
    name: "Camilo Vieira dos Santos",
    role: "HM Engenharia",
    initials: "CV",
  },
  {
    text: "Posso dizer com certeza e garantia que o sistema VIABIL é uma ferramenta fundamental e imprescindível na análise de novos negócios para que possamos aferir, definir, planejar e conseguir alcançar nossos almejados resultados em cada empreendimento.",
    name: "Wilson Sequeira",
    role: "Diretor de Incorporação · INTERRIO",
    initials: "WS",
  },
  {
    text: "Nesses 15 anos de mercado, tive a oportunidade de poder trabalhar com este sistema em todas as empresas onde passei. O VIABIL acompanhou as mudanças, desenvolveu novas ferramentas e colaborou com o crescimento do Real Estate em todo o Brasil.",
    name: "Greco G Montagna",
    role: "Gerente Comercial Real Estate · BTGPactual",
    initials: "GM",
  },
  {
    text: "Seus recursos atendem às necessidades da empresa, padronizando procedimentos, análises físico-financeiras e acompanhamento de resultados.",
    name: "Equipe de Planejamento",
    role: "Cyrela",
    initials: "CY",
  },
  {
    text: "O VIABIL é um aliado da empresa, dando agilidade ao processo e fornecendo informações claras e objetivas que permitem aos nossos diretores tomar decisões mais seguras com relação aos nossos investimentos.",
    name: "Diretoria de Investimentos",
    role: "Rodobens Negócios Imobiliários",
    initials: "RD",
  },
  {
    text: "Com o VIABIL, conseguimos parametrizar nossos estudos, aumentar nossa assertividade e controlar o acesso a múltiplos usuários, sem perder a confiabilidade nos resultados e ainda conseguimos trocar informações com rapidez e transparência com outras incorporadoras.",
    name: "Novos Negócios",
    role: "Porto Ferraz Construtora",
    initials: "PF",
  },
  {
    text: "O VIABIL é uma ferramenta indispensável no dia a dia de nossa empresa, seja para cadastrar terrenos, padronizar os estudos de viabilidade econômica, tomadas de decisões de investimento e controle dos nossos resultados.",
    name: "Equipe Técnica",
    role: "Cury Construtora",
    initials: "CU",
  },
  {
    text: "A ferramenta acompanha mudanças do mercado e proporciona respostas rápidas sem perder a capacidade de analisar diversas variáveis.",
    name: "Real Estate",
    role: "BTG Pactual",
    initials: "BT",
  },
  {
    text: "O treinamento foi flexibilizado às nossas necessidades de horário e conteúdo, sempre com atenção à nossa realidade.",
    name: "Treinamento e Implantação",
    role: "Sequóia",
    initials: "SQ",
  },
  {
    text: "An outstanding and dynamic training, that I'll definitely recommend to all my partners. It's extremely important because VIABIL covers deep content that we must understand to operate better and efficiently.",
    name: "Equipe",
    role: "Paroma Incorporações",
    initials: "PM",
  },
];

const col1 = testimonials.slice(0, 4);
const col2 = testimonials.slice(4, 8);
const col3 = testimonials.slice(8, 12);

export function DepoimentosSection() {
  return (
    <div>
      <style>{`
        .testimonials-mobile-grid {
          display: none;
        }

        @media (max-width: 440px) {
          .testimonials-desktop-grid {
            display: none !important;
          }

          .testimonials-heading-grid {
            grid-template-columns: 1fr !important;
          }

          .testimonials-mobile-grid {
            display: block;
          }
        }
      `}</style>

      <div
        className="testimonials-heading-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, .78fr) minmax(260px, .42fr)",
          alignItems: "end",
          gap: "28px",
          marginTop: "64px",
          marginBottom: "30px",
          paddingTop: "34px",
          borderTop: "1px solid rgba(10,75,53,.14)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <span
            style={{
              display: "inline-block",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#0A4B35",
              marginBottom: "12px",
            }}
          >
            Depoimentos
          </span>
          <h3
            style={{
              maxWidth: "640px",
              fontSize: "clamp(24px, 3vw, 38px)",
              lineHeight: 1.08,
              letterSpacing: 0,
              color: "#0A4B35",
              margin: 0,
            }}
          >
            Como clientes descrevem o impacto do VIABIL.
          </h3>
        </motion.div>
      </div>

      <div
        className="testimonials-desktop-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "18px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          maxHeight: "680px",
          overflow: "hidden",
        }}
      >
        <TestimonialsColumn testimonials={col1} duration={28} />
        <TestimonialsColumn testimonials={col2} duration={34} />
        <TestimonialsColumn testimonials={col3} duration={30} />
      </div>

      <div
        className="testimonials-mobile-grid"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          maxHeight: "680px",
          overflow: "hidden",
        }}
      >
        <TestimonialsColumn testimonials={testimonials} duration={72} />
      </div>
    </div>
  );
}
