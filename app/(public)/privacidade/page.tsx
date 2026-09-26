import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/marketing/LegalPage";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  alternates: { canonical: "/privacidade" },
  description:
    "Como a BDK Solutions coleta, usa, compartilha e protege dados pessoais no site do VIABIL, conforme a Lei Geral de Proteção de Dados (LGPD).",
};

const sections: LegalSection[] = [
  {
    id: "controlador",
    title: "1. Quem trata os seus dados",
    body: (
      <>
        <p>
          O controlador dos dados pessoais coletados neste site é a <strong>BDK Solutions</strong>,
          empresa responsável pelo desenvolvimento, comercialização, treinamento, implantação e
          suporte do <strong>VIABIL</strong> — software de viabilidade econômico-financeira para
          empreendimentos imobiliários, em atuação desde 1995.
        </p>
        <p>
          Para qualquer assunto relacionado a privacidade e proteção de dados, fale com o
          encarregado pelo tratamento de dados pessoais (DPO) pelo e-mail{" "}
          <a href="mailto:privacidade@viabil.com.br">privacidade@viabil.com.br</a>.
        </p>
      </>
    ),
  },
  {
    id: "dados",
    title: "2. Quais dados coletamos",
    body: (
      <>
        <p>Coletamos apenas o necessário para responder ao seu interesse comercial:</p>
        <ul>
          <li>
            <strong>Dados que você informa.</strong> Nome, e-mail profissional, telefone, empresa,
            cargo, segmento de atuação e a mensagem escrita nos formulários de contato, de
            solicitação de demonstração e de download do protótipo de viabilidade.
          </li>
          <li>
            <strong>Preferência de comunicação.</strong> Se você marcou a opção de receber
            conteúdos e novidades do VIABIL.
          </li>
          <li>
            <strong>Dados técnicos de navegação.</strong> Endereço IP, tipo de dispositivo,
            navegador, páginas visitadas e origem da visita. Esses dados são tratados de forma
            agregada e só são coletados para medição de audiência se você consentir.
          </li>
          <li>
            <strong>Conversas por WhatsApp.</strong> Ao iniciar contato pelo botão de WhatsApp, o
            conteúdo da conversa e o seu número ficam registrados no aplicativo, sujeitos também à
            política de privacidade da Meta.
          </li>
        </ul>
        <p>
          Não coletamos dados pessoais sensíveis, não tomamos decisões automatizadas com efeitos
          jurídicos sobre você e não direcionamos este site a menores de 18 anos.
        </p>
      </>
    ),
  },
  {
    id: "finalidades",
    title: "3. Para que usamos e com qual base legal",
    body: (
      <>
        <ul>
          <li>
            <strong>Responder a solicitações comerciais</strong> — agendar demonstrações, enviar
            propostas e materiais pedidos. Base legal: procedimentos preliminares relacionados a
            contrato, a pedido do titular (art. 7º, V, LGPD).
          </li>
          <li>
            <strong>Enviar o protótipo de viabilidade em Excel</strong> quando solicitado. Base
            legal: execução de solicitação do titular (art. 7º, V, LGPD).
          </li>
          <li>
            <strong>Enviar conteúdos e novidades</strong> sobre viabilidade e mercado imobiliário.
            Base legal: consentimento (art. 7º, I, LGPD), revogável a qualquer momento.
          </li>
          <li>
            <strong>Medir audiência e melhorar o site.</strong> Base legal: consentimento (art. 7º,
            I, LGPD), recolhido pelo aviso de cookies.
          </li>
          <li>
            <strong>Segurança, prevenção a fraude e cumprimento de obrigações legais.</strong> Base
            legal: legítimo interesse e cumprimento de obrigação legal (art. 7º, II e IX, LGPD).
          </li>
        </ul>
        <p>
          Não vendemos dados pessoais e não os utilizamos para publicidade comportamental de
          terceiros.
        </p>
      </>
    ),
  },
  {
    id: "compartilhamento",
    title: "4. Com quem compartilhamos",
    body: (
      <>
        <p>
          Compartilhamos dados apenas com operadores que sustentam o funcionamento do site e do
          atendimento comercial, sempre limitados ao necessário:
        </p>
        <ul>
          <li>
            <strong>Vercel</strong> — hospedagem do site e medição de audiência, quando consentida.
          </li>
          <li>
            <strong>Supabase</strong> — banco de dados onde ficam armazenados os registros de
            contato e de inscrição.
          </li>
          <li>
            <strong>Resend</strong> — envio de e-mails transacionais e de conteúdo.
          </li>
          <li>
            <strong>Sentry</strong> — monitoramento de erros técnicos da aplicação.
          </li>
          <li>
            <strong>Meta (WhatsApp)</strong> — quando você opta por falar conosco por WhatsApp.
          </li>
        </ul>
        <p>
          Parte desses fornecedores processa dados fora do Brasil. Nesses casos, a transferência
          internacional se apoia nas hipóteses do art. 33 da LGPD, com cláusulas contratuais e
          garantias de segurança equivalentes.
        </p>
      </>
    ),
  },
  {
    id: "seguranca",
    title: "5. Segurança e prazo de guarda",
    body: (
      <>
        <p>
          Adotamos medidas técnicas e administrativas para proteger os seus dados: tráfego
          criptografado (HTTPS), criptografia de dados pessoais em repouso, acesso restrito às
          equipes comercial e de suporte, e registro de eventos de segurança.
        </p>
        <p>
          Mantemos os dados de contato comercial enquanto durar o relacionamento e por até{" "}
          <strong>5 anos</strong> após o último contato, prazo compatível com a prescrição civil.
          Dados de inscrição em comunicações são mantidos até o cancelamento da inscrição. Depois
          disso, são eliminados ou anonimizados, salvo obrigação legal de guarda.
        </p>
      </>
    ),
  },
  {
    id: "direitos",
    title: "6. Os seus direitos",
    body: (
      <>
        <p>A LGPD garante a você, a qualquer momento e sem custo:</p>
        <ul>
          <li>confirmação de que tratamos os seus dados e acesso a eles;</li>
          <li>correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
          <li>portabilidade a outro fornecedor, mediante requisição;</li>
          <li>eliminação dos dados tratados com base no seu consentimento;</li>
          <li>informação sobre com quem compartilhamos os seus dados;</li>
          <li>revogação do consentimento;</li>
          <li>oposição a tratamento feito com base em legítimo interesse.</li>
        </ul>
        <p>
          Para exercer qualquer um deles, escreva para{" "}
          <a href="mailto:privacidade@viabil.com.br">privacidade@viabil.com.br</a>. Respondemos em
          até 15 dias. Você também pode peticionar diretamente à Autoridade Nacional de Proteção de
          Dados (ANPD).
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "7. Cookies",
    body: (
      <p>
        O detalhamento de cada categoria de cookie e de como rever a sua escolha está na{" "}
        <Link href="/cookies">Política de Cookies</Link>.
      </p>
    ),
  },
  {
    id: "alteracoes",
    title: "8. Alterações desta política",
    body: (
      <p>
        Podemos atualizar esta política para refletir mudanças no site, nos fornecedores ou na
        legislação. A data de vigência no topo desta página sempre indica a versão atual, e
        alterações relevantes serão comunicadas de forma destacada no site.
      </p>
    ),
  },
];

export default function PrivacidadePage() {
  return (
    <LegalPage
      kicker="Privacidade"
      title="Política de Privacidade"
      lede="Como a BDK Solutions trata os dados pessoais coletados no site do VIABIL, em conformidade com a Lei nº 13.709/2018 (LGPD)."
      updatedAt="18 de setembro de 2026"
      sections={sections}
    />
  );
}
