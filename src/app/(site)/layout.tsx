import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
