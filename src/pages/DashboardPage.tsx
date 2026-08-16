import { StatsCards } from "@/components/dashboard/StatsCards"
import { StatsCardsSkeleton } from "@/components/dashboard/StatsCardsSkeleton"
import { NeedsRestockingSection } from "@/components/dashboard/NeedsRestockingSection"
import type { Product, Category } from "@/types/inventory"

interface DashboardPageProps {
  products: Product[]
  categories: Category[]
  isLoading: boolean
}

export default function DashboardPage({ products, categories, isLoading }: DashboardPageProps) {
  return (
    <div className="p-4 lg:p-8">
      <h2 className="text-2xl font-semibold text-foreground">Dashboard</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Overview of your inventory and stock levels.
      </p>

      <div className="mt-6">
        {isLoading ? <StatsCardsSkeleton /> : <StatsCards products={products} categories={categories} />}
      </div>

      <div className="mt-6">
        <NeedsRestockingSection products={products} isLoading={isLoading} />
      </div>
    </div>
  )
}