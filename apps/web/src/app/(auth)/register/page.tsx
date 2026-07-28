import type { Metadata } from 'next';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

export const metadata: Metadata = {
  title: 'Criar conta — TaskFlow',
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Criar conta no TaskFlow</h1>
      <RegisterForm />
    </div>
  );
}
