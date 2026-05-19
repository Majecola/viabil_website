import { LandingPage } from "@/components/landing-page";
import { Footer } from "@/components/marketing/Footer";
import { Navbar } from "@/components/marketing/Navbar";
import { WhatsAppFloatingButton } from "@/components/marketing/WhatsAppFloatingButton";

export default function Page() {
  return (
    <div className="site-shell">
      <Navbar />
      <main className="site-main">
        <LandingPage />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
