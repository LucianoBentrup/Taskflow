import type { Metadata } from 'next';
import { QueryProvider } from '@/providers/query-provider';
import { AuthProvider } from '@/providers/auth-provider';
import { ToastProvider } from '@/providers/toast-provider';
import { CustomThemeProvider } from '@/providers/theme-provider';
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
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <CustomThemeProvider>
          <ToastProvider />
          <QueryProvider>
            <AuthProvider>{children}</AuthProvider>
          </QueryProvider>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
