import { StatsCards } from "@/components/dashboard/StatsCards"
import type { Product, Category } from "@/types/inventory"

interface DashboardPageProps {
  products: Product[]
  categories: Category[]
}

export default function DashboardPage({ products, categories }: DashboardPageProps) {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
      <p className="mt-1 text-sm text-gray-500">Overview ng inventory mo.</p>

      <div className="mt-6">
        <StatsCards products={products} categories={categories} />
      </div>
    </div>
  )
}