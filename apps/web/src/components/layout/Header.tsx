import { CircleUserRound } from 'lucide-react';

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <span className="text-lg font-semibold md:hidden">TaskFlow</span>
      <div className="flex flex-1 justify-end">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CircleUserRound className="h-5 w-5" />
          {/* TODO: exibir nome/avatar do usuário autenticado (Sprint 2) */}
        </div>
      </div>
    </header>
  );
}
