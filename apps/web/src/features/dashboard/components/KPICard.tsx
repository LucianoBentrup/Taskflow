type KPICardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  variant?: 'default' | 'accent' | 'success';
};

export function KPICard({ title, value, icon, variant = 'default' }: KPICardProps) {
  const variantStyles = {
    default: 'border-gray-200 bg-white',
    accent: 'border-blue-200 bg-blue-50',
    success: 'border-green-200 bg-green-50',
  };

  return (
    <div className={`rounded-lg border px-6 py-4 ${variantStyles[variant]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
    </div>
  );
}
