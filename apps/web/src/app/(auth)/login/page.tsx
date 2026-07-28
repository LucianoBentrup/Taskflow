import type { Metadata } from 'next';
import { LoginForm } from '@/features/auth/components/LoginForm';

export const metadata: Metadata = {
  title: 'Entrar — TaskFlow',
};

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Entrar no TaskFlow</h1>
      <LoginForm />
    </div>
  );
}
