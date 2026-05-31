import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VIABIL | Inteligência financeira para o mercado imobiliário",
  description:
    "O VIABIL é a plataforma de referência em viabilidade econômico-financeira para incorporadoras, loteadoras e desenvolvedores imobiliários. Do terreno ao resultado.",
  icons: {
    icon: "/assets/viabil-logo.webp",
  },
  openGraph: {
    title: "VIABIL | Inteligência financeira para o mercado imobiliário",
    description:
      "Do terreno ao resultado: decisões mais seguras para incorporadoras, loteadoras e desenvolvedores imobiliários.",
    type: "website",
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
