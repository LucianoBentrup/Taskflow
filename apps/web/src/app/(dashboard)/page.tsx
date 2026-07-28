'use client';

import { useAuth } from '@/hooks/useAuth';

export default function HomePage() {
  const { user } = useAuth();

  return <h1 className="text-xl font-semibold">Bem-vindo, {user?.name}!</h1>;
}
