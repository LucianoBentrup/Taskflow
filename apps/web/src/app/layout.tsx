import type { Metadata } from 'next';
import { QueryProvider } from '@/providers/query-provider';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'TaskFlow',
  description: 'Sistema de gestão de tarefas e projetos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <QueryProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-1 flex-col">
              <Header />
              <main className="flex-1 p-6">{children}</main>
            </div>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
