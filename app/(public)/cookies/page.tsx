import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/marketing/LegalPage";
import { ConsentReset } from "@/components/marketing/ConsentReset";

export const metadata: Metadata = {
  title: "Política de Cookies",
  alternates: { canonical: "/cookies" },
  description:
    "Quais cookies e tecnologias de armazenamento o site do VIABIL utiliza, para que servem e como rever a sua escolha a qualquer momento.",
};

const sections: LegalSection[] = [
  {
    id: "o-que-sao",
    title: "1. O que usamos",
    body: (
      <>
        <p>
          Este site usa cookies e armazenamento local do navegador — pequenos arquivos gravados no
          seu dispositivo que permitem lembrar preferências e medir audiência. Usamos poucos, e
          nenhum deles serve a publicidade.
        </p>
        <p>
          Cookies essenciais são carregados sempre, porque sem eles o site não funciona. Os de
          medição de audiência só são carregados <strong>depois</strong> de você aceitar no aviso
          exibido na primeira visita.
        </p>
      </>
    ),
  },
  {
    id: "categorias",
    title: "2. Categorias",
    body: (
      <>
        <h3>Essenciais — sempre ativos</h3>
        <ul>
          <li>
            <code>viabil:consent</code> — guarda a sua decisão sobre cookies para não perguntarmos
            de novo a cada visita. Validade: 12 meses.
          </li>
          <li>
            <code>viabil:prototipo-modal</code> — registra que você já viu o convite do protótipo
            de viabilidade, para não repeti-lo. Validade: 45 dias.
          </li>
          <li>
            Cookies de segurança e de balanceamento de carga da infraestrutura (Vercel),
            necessários para servir as páginas e proteger contra abuso.
          </li>
        </ul>

        <h3>Medição de audiência — opcionais</h3>
        <ul>
          <li>
            <strong>Vercel Analytics</strong> — registra páginas visitadas, origem da visita e tipo
            de dispositivo, de forma agregada. Não cria perfil publicitário, não cruza dados com
            outros sites e não identifica você pessoalmente.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "gerenciar",
    title: "3. Rever a sua escolha",
    body: (
      <>
        <p>
          Você pode mudar de ideia quando quiser. O botão abaixo apaga a sua decisão e faz o aviso
          de cookies aparecer novamente, para que você escolha de novo.
        </p>
        <ConsentReset />
        <p>
          Também é possível bloquear ou apagar cookies diretamente nas configurações do seu
          navegador. Bloquear os essenciais pode impedir o envio de formulários e fazer o aviso de
          cookies reaparecer a cada visita.
        </p>
      </>
    ),
  },
  {
    id: "mais",
    title: "4. Mais informações",
    body: (
      <p>
        O tratamento de dados pessoais associado a esses cookies, as bases legais e os seus
        direitos como titular estão descritos na{" "}
        <Link href="/privacidade">Política de Privacidade</Link>.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      kicker="Cookies"
      title="Política de Cookies"
      lede="O que gravamos no seu navegador, por quanto tempo e como desfazer essa escolha."
      updatedAt="18 de setembro de 2026"
      sections={sections}
    />
  );
}
