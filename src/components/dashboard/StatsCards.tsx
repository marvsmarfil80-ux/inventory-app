import { Card } from "@/components/ui/card"
import type { Product, Category } from "@/types/inventory"
import { getTotalItems, getTotalValue, getLowStockCount } from "@/lib/inventory-stats"

interface StatsCardsProps {
  products: Product[]
  categories: Category[]
}

export function StatsCards({ products, categories }: StatsCardsProps) {
  const lowStockCount = getLowStockCount(products)

  const stats = [
    { label: "Total Items", value: getTotalItems(products).toLocaleString() },
    { label: "Total Value", value: `$${getTotalValue(products).toLocaleString(undefined, { minimumFractionDigits: 2 })}` },
    { label: "Low Stock", value: lowStockCount, alert: lowStockCount > 0 },
    { label: "Categories", value: categories.length },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4">
          <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
          <p className={`mt-1 text-2xl font-semibold ${stat.alert ? "text-primary" : "text-foreground"}`}>
            {stat.value}
          </p>
        </Card>
      ))}
    </div>
  )
}