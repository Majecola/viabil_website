import { NotFoundContent } from "@/components/marketing/NotFoundContent";

export const metadata = {
  title: "Página não encontrada | VIABIL",
};

/**
 * 404 boundary for the (public) group — a notFound() from any page in here
 * lands on this instead of the root one.
 *
 * Deliberately bare: PublicLayout already renders the navbar, <main> and
 * footer around it. Rendering the root 404 here instead would nest a second
 * copy of all three inside the first.
 */
export default function PublicNotFound() {
  return <NotFoundContent />;
}
