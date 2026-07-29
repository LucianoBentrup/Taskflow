import Link from 'next/link';
import { LayoutDashboard, FolderKanban, ListChecks, UserCircle } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Projetos', href: '/projects', icon: FolderKanban },
  { label: 'Tarefas', href: '/tasks', icon: ListChecks },
  { label: 'Perfil', href: '/profile', icon: UserCircle },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-background md:flex md:flex-col">
      <div className="flex h-16 items-center border-b border-border px-6">
        <span className="text-lg font-semibold text-foreground">TaskFlow</span>
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
