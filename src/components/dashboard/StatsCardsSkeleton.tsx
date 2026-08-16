import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="p-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="mt-2 h-7 w-16" />
        </Card>
      ))}
    </div>
  )
}