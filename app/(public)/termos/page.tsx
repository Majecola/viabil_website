import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/marketing/LegalPage";

export const metadata: Metadata = {
  title: "Termos de Uso",
  alternates: { canonical: "/termos" },
  description:
    "Condições de uso do site do VIABIL: conteúdo informativo, materiais gratuitos, propriedade intelectual e limites de responsabilidade.",
};

const sections: LegalSection[] = [
  {
    id: "objeto",
    title: "1. O que estes termos cobrem",
    body: (
      <>
        <p>
          Estes Termos de Uso regem o acesso e a navegação no site institucional do{" "}
          <strong>VIABIL</strong>, mantido pela <strong>BDK Solutions</strong>. Ao navegar por
          aqui, você concorda com as condições abaixo.
        </p>
        <p>
          Este site é material informativo e comercial. Ele <strong>não</strong> é o software
          VIABIL, e o uso da plataforma é regido por contrato de licença próprio, assinado
          separadamente entre a BDK Solutions e a empresa contratante.
        </p>
      </>
    ),
  },
  {
    // Not "conteudo": the public layout's <main> already owns that id, and a
    // duplicate breaks the skip link and the main landmark.
    id: "natureza-do-conteudo",
    title: "2. Natureza do conteúdo",
    body: (
      <>
        <p>
          Os textos, indicadores, exemplos numéricos, cenários e materiais publicados neste site
          têm finalidade ilustrativa e educacional sobre viabilidade econômico-financeira de
          empreendimentos imobiliários.
        </p>
        <p>
          <strong>
            Nada aqui constitui recomendação de investimento, consultoria financeira, contábil,
            tributária ou jurídica.
          </strong>{" "}
          Decisões de aquisição de terreno, lançamento, funding ou desinvestimento devem se apoiar
          em estudo próprio, dados auditados e assessoria profissional qualificada. A BDK Solutions
          não responde por decisões tomadas a partir de exemplos publicados neste site.
        </p>
      </>
    ),
  },
  {
    id: "materiais",
    title: "3. Materiais gratuitos",
    body: (
      <>
        <p>
          Oferecemos materiais gratuitos mediante cadastro — como o protótipo de viabilidade em
          Excel. Ao solicitá-los, você concorda que:
        </p>
        <ul>
          <li>os dados informados são verdadeiros e o e-mail é de sua titularidade ou uso legítimo;</li>
          <li>
            o material é licenciado para uso interno, próprio ou da sua empresa, sem direito de
            revenda, sublicenciamento ou redistribuição pública;
          </li>
          <li>
            os modelos são fornecidos <em>no estado em que se encontram</em>, sem garantia de
            adequação a um empreendimento específico, e os resultados dependem integralmente das
            premissas que você inserir;
          </li>
          <li>
            podemos entrar em contato comercialmente a respeito da sua solicitação, e você pode
            pedir a interrupção desse contato a qualquer momento.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "propriedade",
    title: "4. Propriedade intelectual",
    body: (
      <>
        <p>
          <strong>VIABIL®</strong> é marca da BDK Solutions. O software, a metodologia, a
          identidade visual, os textos, as imagens, os layouts e o código deste site são protegidos
          por direitos de propriedade intelectual e pertencem à BDK Solutions ou aos seus
          licenciadores.
        </p>
        <p>
          É permitido citar trechos com indicação clara da fonte e link para a página original. É
          vedada a reprodução integral, a engenharia reversa, a extração automatizada em massa
          (<em>scraping</em>) e o uso do conteúdo para treinar modelos ou compor produtos
          concorrentes, sem autorização prévia e por escrito.
        </p>
      </>
    ),
  },
  {
    id: "uso",
    title: "5. Uso aceitável",
    body: (
      <>
        <p>Ao usar este site, você se compromete a não:</p>
        <ul>
          <li>tentar obter acesso não autorizado a sistemas, contas ou dados;</li>
          <li>interferir na disponibilidade do serviço, incluindo sobrecarga automatizada;</li>
          <li>enviar conteúdo ilícito, ofensivo ou dados pessoais de terceiros sem base legal;</li>
          <li>usar os formulários para comunicação em massa não solicitada.</li>
        </ul>
        <p>
          Podemos suspender o acesso e adotar as medidas legais cabíveis diante de uso abusivo.
        </p>
      </>
    ),
  },
  {
    id: "disponibilidade",
    title: "6. Disponibilidade e links externos",
    body: (
      <>
        <p>
          Trabalhamos para manter o site disponível e atualizado, mas ele pode passar por
          manutenções, interrupções e alterações de conteúdo sem aviso prévio. Este site está em
          evolução e seu conteúdo pode ser ampliado ou revisado.
        </p>
        <p>
          O site contém links para serviços de terceiros — como WhatsApp. Não controlamos esses
          serviços nem respondemos por seu conteúdo, disponibilidade ou práticas de privacidade.
        </p>
      </>
    ),
  },
  {
    id: "responsabilidade",
    title: "7. Limitação de responsabilidade",
    body: (
      <p>
        Na máxima extensão permitida pela legislação brasileira, a BDK Solutions não responde por
        danos indiretos, lucros cessantes, perda de oportunidade ou prejuízos decorrentes de
        decisões de investimento tomadas com base em conteúdo informativo deste site. Esta
        limitação não afasta direitos assegurados pelo Código de Defesa do Consumidor quando
        aplicável, nem responsabilidades que não possam ser excluídas por lei.
      </p>
    ),
  },
  {
    id: "privacidade",
    title: "8. Privacidade",
    body: (
      <p>
        O tratamento de dados pessoais está descrito na{" "}
        <Link href="/privacidade">Política de Privacidade</Link> e o uso de cookies na{" "}
        <Link href="/cookies">Política de Cookies</Link>, que integram estes Termos.
      </p>
    ),
  },
  {
    id: "alteracoes",
    title: "9. Alterações e foro",
    body: (
      <p>
        Estes Termos podem ser atualizados a qualquer momento; a data de vigência no topo desta
        página indica a versão em vigor. Aplica-se a legislação brasileira, ficando eleito o foro
        da comarca da sede da BDK Solutions para dirimir controvérsias, com renúncia a qualquer
        outro, por mais privilegiado que seja.
      </p>
    ),
  },
];

export default function TermosPage() {
  return (
    <LegalPage
      kicker="Termos"
      title="Termos de Uso"
      lede="As condições que valem para quem navega neste site e baixa os materiais gratuitos do VIABIL."
      updatedAt="18 de setembro de 2026"
      sections={sections}
    />
  );
}
