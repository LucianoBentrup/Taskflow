'use client';

import { CircleUserRound, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <span className="text-lg font-semibold md:hidden">TaskFlow</span>
      <div className="flex flex-1 items-center justify-end gap-3 text-sm text-muted-foreground">
        <CircleUserRound className="h-5 w-5" />
        {user && <span>{user.name}</span>}
        {user && (
          <button
            type="button"
            onClick={() => void logout()}
            className="flex items-center gap-1 text-sm hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        )}
      </div>
    </header>
  );
}
