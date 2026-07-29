'use client';

import { CircleUserRound, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ThemeToggle } from '@/components/theme-toggle';
import { MobileNav } from '@/components/layout/MobileNav';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="relative flex h-16 items-center justify-between border-b border-border bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <MobileNav />
        <span className="text-lg font-semibold md:hidden">TaskFlow</span>
      </div>
      <div className="flex items-center justify-end gap-3 text-sm text-muted-foreground">
        <ThemeToggle />
        <CircleUserRound className="h-5 w-5" />
        {user && <span className="hidden sm:inline">{user.name}</span>}
        {user && (
          <button
            type="button"
            onClick={() => void logout()}
            className="flex items-center gap-1 text-sm hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        )}
      </div>
    </header>
  );
}
