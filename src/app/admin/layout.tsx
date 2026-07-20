import { AuthProvider } from "@/components/admin/auth-provider";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-full bg-muted/30">{children}</div>
    </AuthProvider>
  );
}
