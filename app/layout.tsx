import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.viabil.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VIABIL | Inteligência financeira para o mercado imobiliário",
    template: "%s | VIABIL",
  },
  description:
    "O VIABIL é a plataforma de referência em viabilidade econômico-financeira para incorporadoras, loteadoras e desenvolvedores imobiliários. Do terreno ao resultado.",
  applicationName: "VIABIL",
  keywords: [
    "viabilidade econômico-financeira",
    "estudo de viabilidade imobiliária",
    "software para incorporadoras",
    "análise de viabilidade de empreendimentos",
    "gestão de terrenos",
    "landbank",
    "previsto x realizado",
    "fluxo de caixa imobiliário",
    "VGV",
    "TIR",
    "VPL",
    "incorporação residencial",
    "loteamentos",
    "VIABIL",
    "BDK Solutions",
  ],
  authors: [{ name: "BDK Solutions" }],
  creator: "BDK Solutions",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/logos/viabil-favicon.png",
  },
  openGraph: {
    title: "VIABIL | Inteligência financeira para o mercado imobiliário",
    description:
      "Do terreno ao resultado: decisões mais seguras para incorporadoras, loteadoras e desenvolvedores imobiliários.",
    type: "website",
    url: siteUrl,
    locale: "pt_BR",
    siteName: "VIABIL",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIABIL | Inteligência financeira para o mercado imobiliário",
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
    <html lang="pt-BR" className={outfit.variable} data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
