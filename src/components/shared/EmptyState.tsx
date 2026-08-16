import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-white py-16 text-center">
      {Icon && (
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <Icon size={18} className="text-gray-400" />
        </div>
      )}
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="mt-1 max-w-xs text-sm text-gray-500">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-4 bg-[#FF6A3D] hover:bg-[#FF6A3D]/90">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}