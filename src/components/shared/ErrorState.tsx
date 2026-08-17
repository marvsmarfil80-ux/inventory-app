import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card py-16 text-center">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-50 dark:bg-red-950">
        <AlertCircle size={18} className="text-red-500 dark:text-red-400" />
      </div>
      <p className="text-sm font-medium text-foreground">Something went wrong</p>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
        {message || "Unable to load data. Please check your connection and try again."}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="mt-4">
          Retry
        </Button>
      )}
    </div>
  )
}