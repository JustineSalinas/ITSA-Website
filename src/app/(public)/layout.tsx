import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AskItsaPanel } from "@/components/chat/ask-itsa-server";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* Public pages only — never rendered over the admin surface. */}
      <AskItsaPanel />
    </div>
  );
}
