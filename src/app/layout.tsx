import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agende Fácil",
  description: "Gerencie seus agendamentos de forma prática e moderna",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <main className="min-h-screen bg-agua text-verde-escuro font-sans">
          <div className="max-w-md mx-auto px-4 py-8">{children}</div>
        </main>
      </body>
    </html>
  );
}
