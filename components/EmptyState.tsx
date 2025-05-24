interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
  className?: string;
}

export default function EmptyState({
  title,
  description,
  icon = "🔍",
  className = ""
}: EmptyStateProps) {
  return (
    <div className={`flex items-center justify-center min-h-[300px] ${className}`}>
      <div className="text-center text-gray-600">
        <div className="text-4xl mb-4">{icon}</div>
        <p className="text-xl font-medium mb-2">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
} 