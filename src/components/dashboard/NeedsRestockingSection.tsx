import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export function NeedsRestockingSection() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-semibold text-foreground">Needs restocking</h3>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link to="/products">View all products</Link>
        </Button>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-lg" />
        ))}
      </div>
    </div>
  )
}