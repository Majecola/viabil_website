import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VIABIL | Inteligência Financeira para o Mercado Imobiliário",
  description:
    "O VIABIL é a plataforma de referência em viabilidade financeira para incorporadoras, loteadoras e desenvolvedores imobiliários. Do terreno ao resultado.",
  openGraph: {
    title: "VIABIL | Inteligência Financeira para o Mercado Imobiliário",
    description:
      "Do terreno ao resultado: decisões mais seguras para incorporadoras, loteadoras e desenvolvedores imobiliários.",
    type: "website",
    locale: "pt_BR",
    siteName: "VIABIL",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIABIL | Inteligência Financeira para o Mercado Imobiliário",
    description:
      "Do terreno ao resultado: decisões mais seguras para incorporadoras, loteadoras e desenvolvedores imobiliários.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
