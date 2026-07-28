'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const PUBLIC_ROUTES = ['/login', '/register'];

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isPublicRoute) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, isPublicRoute, router]);

  if (isPublicRoute) {
    return <>{children}</>;
  }

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
