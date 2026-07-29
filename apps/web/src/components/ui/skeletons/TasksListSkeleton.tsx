'use client';

export function TasksListSkeleton() {
  return (
    <div className="space-y-4">
      {/* Filtros skeleton */}
      <div className="grid grid-cols-3 gap-4">
        <div className="h-10 animate-pulse rounded-md border border-gray-200 bg-gray-100" />
        <div className="h-10 animate-pulse rounded-md border border-gray-200 bg-gray-100" />
        <div className="h-10 animate-pulse rounded-md border border-gray-200 bg-gray-100" />
      </div>

      {/* Tabela skeleton */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Título</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Prioridade</th>
              <th className="px-4 py-3 text-left font-medium">Data de Vencimento</th>
              <th className="px-4 py-3 text-right font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="border-b">
                <td className="px-4 py-3">
                  <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-9 w-32 animate-pulse rounded border border-gray-200 bg-gray-100" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
                    <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
