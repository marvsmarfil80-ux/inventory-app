import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types/inventory"

interface StatusBadgeProps {
  product: Pick<Product, "quantity" | "low_stock_threshold">
}

export function StatusBadge({ product }: StatusBadgeProps) {
  if (product.quantity === 0) {
    return (
      <Badge
        variant="outline"
        className="border-red-200 bg-red-50 text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400"
      >
        Out of Stock
      </Badge>
    )
  }

  if (product.quantity <= product.low_stock_threshold) {
    return (
      <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
        Low Stock
      </Badge>
    )
  }

  return (
    <Badge
      variant="outline"
      className="border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400"
    >
      In Stock
    </Badge>
  )
}