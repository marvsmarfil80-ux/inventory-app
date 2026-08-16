import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types/inventory"

interface StatusBadgeProps {
  product: Pick<Product, "quantity" | "low_stock_threshold">
}

export function StatusBadge({ product }: StatusBadgeProps) {
  if (product.quantity === 0) {
    return (
      <Badge variant="outline" className="border-red-200 bg-red-50 text-red-600">
        Out of Stock
      </Badge>
    )
  }

  if (product.quantity <= product.low_stock_threshold) {
    return (
      <Badge variant="outline" className="border-[#FF6A3D]/30 bg-[#FF6A3D]/10 text-[#FF6A3D]">
        Low Stock
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
      In Stock
    </Badge>
  )
}