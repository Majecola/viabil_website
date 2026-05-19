import { Footer } from "@/components/marketing/Footer";
import { Navbar } from "@/components/marketing/Navbar";
import { RevealController } from "@/components/marketing/RevealController";
import { WhatsAppFloatingButton } from "@/components/marketing/WhatsAppFloatingButton";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo" className="site-main">
        {children}
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <RevealController />
    </div>
  );
}
