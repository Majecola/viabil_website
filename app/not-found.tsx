import { Footer } from "@/components/marketing/Footer";
import { Navbar } from "@/components/marketing/Navbar";
import { NotFoundContent } from "@/components/marketing/NotFoundContent";
import { WhatsAppFloatingButton } from "@/components/marketing/WhatsAppFloatingButton";

export const metadata = {
  title: "Página não encontrada | VIABIL",
};

/**
 * The global 404, for URLs that match no route segment at all. Those never
 * enter a group layout, so the chrome has to be drawn here.
 *
 * A notFound() raised from inside app/(public) renders the sibling
 * app/(public)/not-found.tsx instead, which skips the chrome because
 * PublicLayout has already drawn it.
 */
export default function NotFound() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo" className="site-main">
        <NotFoundContent />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
