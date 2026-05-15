import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "VIABIL | Inteligencia Financeira para o Ciclo do Empreendimento Imobiliario",
  description:
    "VIABIL - Plataforma de inteligencia financeira para incorporacao imobiliaria. Analise de viabilidade, gestao de landbank, previsto x realizado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
