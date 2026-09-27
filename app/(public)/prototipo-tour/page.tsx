import type { Metadata } from "next";
import { ProdutoTour } from "@/components/marketing/home/ProdutoTour";

export const metadata: Metadata = {
  title: "Protótipo — O VIABIL por dentro",
  robots: { index: false, follow: false },
};

// Review route for the scroll tour built from the owner's demo recording.
// Not linked anywhere; move <ProdutoTour /> into HomeLanding once approved.
export default function PrototipoTourPage() {
  return (
    <div className="v1">
      <ProdutoTour />
    </div>
  );
}
