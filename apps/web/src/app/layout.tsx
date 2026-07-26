import type { Metadata } from 'next';
import { QueryProvider } from '@/providers/query-provider';
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
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
